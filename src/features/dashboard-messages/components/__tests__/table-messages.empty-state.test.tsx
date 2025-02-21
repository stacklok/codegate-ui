import { test } from 'vitest'
import { render, waitFor } from '@/lib/test-utils'
import { server } from '@/mocks/msw/node'
import { emptyStateStrings } from '../../../../constants/empty-state-strings'
import { useSearchParams } from 'react-router-dom'
import { delay, http, HttpHandler, HttpResponse } from 'msw'
import { hrefs } from '@/lib/hrefs'
import { mswEndpoint } from '@/test/msw-endpoint'
import { TableMessagesEmptyState } from '../table-messages-empty-state'
import { AlertTriggerType, PaginatedMessagesResponse } from '@/api/generated'
import { buildFilterablePaginatedMessagesHandler } from '@/mocks/msw/mockers/paginated-messages-response.mock'

enum IllustrationTestId {
  ALERT = 'illustration-alert',
  DONE = 'illustration-done',
  DRAG_AND_DROP = 'illustration-drag-and-drop',
  LOADER = 'illustration-loader',
  NO_SEARCH_RESULTS = 'illustration-no-search-results',
}

type TestCaseAction =
  | {
      role: 'button'
      name: string
      href?: never
    }
  | {
      role: 'link'
      name: string
      href: string
    }

type TestCase = {
  testDescription: string
  handlers: HttpHandler[]
  searchParams: {
    view: AlertTriggerType | 'all' | null
    search: string | null
  }
  expected: {
    title: string
    body: string
    illustrationTestId: IllustrationTestId
    actions: TestCaseAction[] | null
  }
}

vi.mock('react-router-dom', async () => {
  const original =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...original,
    useSearchParams: vi.fn(() => [new URLSearchParams({}), () => {}]),
  }
})

vi.mock('@stacklok/ui-kit', async () => {
  const original =
    await vi.importActual<typeof import('@stacklok/ui-kit')>('@stacklok/ui-kit')
  return {
    ...original,
    IllustrationDone: () => <div data-testid={IllustrationTestId.DONE} />,
    IllustrationDragAndDrop: () => (
      <div data-testid={IllustrationTestId.DRAG_AND_DROP} />
    ),
    IllustrationAlert: () => <div data-testid={IllustrationTestId.ALERT} />,
    IllustrationNoSearchResults: () => (
      <div data-testid={IllustrationTestId.NO_SEARCH_RESULTS} />
    ),
    Loader: () => <div data-testid={IllustrationTestId.LOADER} />,
  }
})

const TEST_CASES: TestCase[] = [
  {
    testDescription: 'Loading state',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        delay('infinite')
      }),
    ],
    searchParams: {
      search: null,
      view: 'all',
    },
    expected: {
      title: emptyStateStrings.title.loading,
      body: emptyStateStrings.body.loading,
      illustrationTestId: IllustrationTestId.LOADER,
      actions: null,
    },
  },
  {
    testDescription: 'Only 1 workspace, no messages',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: 'default',
              is_active: true,
            },
          ],
        })
      }),
      http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
        return HttpResponse.json({
          workspaces: [],
        })
      }),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        () => {
          const responsePayload: PaginatedMessagesResponse = {
            data: [],
            limit: 50,
            offset: 0,
            total: 0,
          }

          return HttpResponse.json(responsePayload)
        }
      ),
    ],
    searchParams: {
      search: null,
      view: 'all',
    },
    expected: {
      body: emptyStateStrings.body.getStartedDesc,
      title: emptyStateStrings.title.getStarted,
      illustrationTestId: IllustrationTestId.DRAG_AND_DROP,
      actions: [
        {
          role: 'link',
          name: 'CodeGate docs',
          href: hrefs.external.docs.home,
        },
      ],
    },
  },
  {
    testDescription: 'No messages, multiple workspaces',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: 'default',
              is_active: true,
            },
            {
              name: 'foo-bar',
              is_active: false,
            },
          ],
        })
      }),
      http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
        return HttpResponse.json({
          workspaces: [],
        })
      }),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        () => {
          const responsePayload: PaginatedMessagesResponse = {
            data: [],
            limit: 50,
            offset: 0,
            total: 0,
          }

          return HttpResponse.json(responsePayload)
        }
      ),
    ],
    searchParams: {
      search: null,
      view: 'all',
    },
    expected: {
      title: emptyStateStrings.title.noMessagesWorkspace,
      body: emptyStateStrings.body.messagesWillShowUpWhenWorkspace,
      illustrationTestId: IllustrationTestId.DONE,
      actions: [
        {
          role: 'link',
          name: 'Learn about workspaces',
          href: hrefs.external.docs.workspaces,
        },
      ],
    },
  },
  {
    testDescription: 'View is "malicious", no messages with "malicious" alerts',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: 'default',
              is_active: true,
            },
            {
              name: 'foo-bar',
              is_active: false,
            },
          ],
        })
      }),
      http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
        return HttpResponse.json({
          workspaces: [],
        })
      }),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        buildFilterablePaginatedMessagesHandler({
          include: {
            'codegate-context-retriever': false,
            'codegate-pii': true,
            'codegate-secrets': true,
            no_alerts: true,
          },
        })
      ),
    ],
    searchParams: {
      view: AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER,
      search: null,
    },
    expected: {
      title: emptyStateStrings.title.noMaliciousPackagesDetected,
      body: emptyStateStrings.body.maliciousDesc,
      illustrationTestId: IllustrationTestId.DONE,
      actions: null,
    },
  },
  {
    testDescription: 'View is "secret", no messages with "secret" alerts',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: 'default',
              is_active: true,
            },
            {
              name: 'foo-bar',
              is_active: false,
            },
          ],
        })
      }),
      http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
        return HttpResponse.json({
          workspaces: [],
        })
      }),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        buildFilterablePaginatedMessagesHandler({
          include: {
            'codegate-context-retriever': true,
            'codegate-pii': true,
            'codegate-secrets': false,
            no_alerts: true,
          },
        })
      ),
    ],
    searchParams: {
      view: AlertTriggerType.CODEGATE_SECRETS,
      search: null,
    },
    expected: {
      title: emptyStateStrings.title.noLeakedSecretsDetected,
      body: emptyStateStrings.body.secretsDesc,
      illustrationTestId: IllustrationTestId.DONE,
      actions: null,
    },
  },
  {
    testDescription: 'View is "pii", no messages with "pii" alerts',
    handlers: [
      http.get(mswEndpoint('/api/v1/workspaces'), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: 'default',
              is_active: true,
            },
            {
              name: 'foo-bar',
              is_active: false,
            },
          ],
        })
      }),
      http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
        return HttpResponse.json({
          workspaces: [],
        })
      }),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        buildFilterablePaginatedMessagesHandler({
          include: {
            'codegate-context-retriever': true,
            'codegate-pii': false,
            'codegate-secrets': true,
            no_alerts: true,
          },
        })
      ),
    ],
    searchParams: {
      view: AlertTriggerType.CODEGATE_PII,
      search: null,
    },
    expected: {
      title: emptyStateStrings.title.noPIIDetected,
      body: emptyStateStrings.body.piiDesc,
      illustrationTestId: IllustrationTestId.DONE,
      actions: null,
    },
  },
]

test.each(TEST_CASES)('$testDescription', async (testCase) => {
  server.use(...testCase.handlers)

  vi.mocked(useSearchParams).mockReturnValue([
    new URLSearchParams({
      search: testCase.searchParams.search ?? '',
      view: testCase.searchParams.view ?? 'all',
    }),
    () => {},
  ])

  const { getByText, getByRole, getByTestId } = render(
    <TableMessagesEmptyState />
  )

  await waitFor(() => {
    expect(
      getByRole('heading', { level: 4, name: testCase.expected.title })
    ).toBeVisible()
    expect(getByText(testCase.expected.body)).toBeVisible()
    expect(getByTestId(testCase.expected.illustrationTestId)).toBeVisible()

    if (testCase.expected.actions) {
      for (const action of testCase.expected.actions) {
        const actionButton = getByRole(action.role, { name: action.name })
        expect(actionButton).toBeVisible()
        if (action.href) {
          expect(actionButton).toHaveAttribute('href', action.href)
        }
      }
    }
  })
})
