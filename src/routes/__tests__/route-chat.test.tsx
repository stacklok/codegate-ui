import { render } from '@/lib/test-utils'
import { screen, waitFor, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { RouteChat } from '../route-chat'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { mswEndpoint } from '@/test/msw-endpoint'
import { mockConversation } from '@/mocks/msw/mockers/conversation.mock'
import { getConversationTitle } from '@/features/dashboard-messages/lib/get-conversation-title'
import { formatTime } from '@/lib/format-time'
import userEvent from '@testing-library/user-event'
import { getProviderString } from '@/features/dashboard-messages/lib/get-provider-string'
import { isAlertMalicious } from '@/lib/is-alert-malicious'
import { isAlertSecret } from '@/lib/is-alert-secret'

vi.mock('@stacklok/ui-kit', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@stacklok/ui-kit')>()),
    Avatar: ({ 'data-testid': dataTestId }: { 'data-testid': string }) => (
      <div data-testid={dataTestId} />
    ),
  }
})

vi.mock('@/hooks/useCurrentPromptStore', () => ({
  useCurrentPromptStore: vi.fn(() => ({
    currentPromptId: 'test-chat-id',
    setCurrentPromptId: vi.fn(),
  })),
}))

it('renders breadcrumbs', async () => {
  const conversation = mockConversation()

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [`/prompt/${conversation.chat_id}`],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    const breadcrumbs = screen.getByRole('list', { name: 'Breadcrumbs' })
    expect(breadcrumbs).toBeVisible()

    expect(
      within(breadcrumbs).getByRole('link', { name: 'Dashboard' })
    ).toHaveAttribute('href', '/')
  })
})

it('renders title', async () => {
  const conversation = mockConversation()

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [`/prompt/${conversation.chat_id}`],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    const heading = screen.getByRole('heading', {
      level: 1,
    })

    expect(heading).toHaveTextContent(getConversationTitle(conversation))
    expect(heading).toHaveTextContent(
      formatTime(new Date(conversation.conversation_timestamp))
    )
  })
})

it('renders conversation summary correctly', async () => {
  const conversation = mockConversation({ alertsConfig: { numAlerts: 10 } })

  const maliciousCount = conversation.alerts.filter(isAlertMalicious).length
  const secretsCount = conversation.alerts.filter(isAlertSecret).length

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [`/prompt/${conversation.chat_id}`],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    expect(screen.getByLabelText('Conversation summary')).toBeVisible()
  })

  const { getByText } = within(screen.getByLabelText('Conversation summary'))

  expect(getByText(getProviderString(conversation.provider))).toBeVisible()

  expect(
    getByText(
      formatTime(new Date(conversation.conversation_timestamp), {
        format: 'absolute',
      })
    )
  ).toBeVisible()

  expect(getByText(conversation.chat_id)).toBeVisible()

  expect(
    getByText(`${maliciousCount} malicious packages detected`)
  ).toBeVisible()

  expect(getByText(`${secretsCount} secrets detected`)).toBeVisible()
})

it('renders chat correctly', async () => {
  const conversation = mockConversation()

  const question = conversation.question_answers[0].question.message
  const answer = conversation.question_answers[0].answer.message

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [`/prompt/${conversation.chat_id}`],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    const { getByText } = within(
      screen.getByLabelText('Conversation transcript')
    )
    expect(getByText(question)).toBeVisible()
    expect(getByText(answer)).toBeVisible()
  })
})

it('renders tabs', async () => {
  const conversation = mockConversation()

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [`/prompt/${conversation.chat_id}`],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    expect(screen.getByRole('tab', { name: /overview/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /secrets/i })).toBeVisible()
  })
})

it('can navigate using tabs', async () => {
  const conversation = mockConversation()

  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () =>
      HttpResponse.json([conversation])
    )
  )

  render(<RouteChat />, {
    routeConfig: {
      initialEntries: [
        {
          pathname: `/prompt/${conversation.chat_id}`,
        },
      ],
    },
    pathConfig: '/prompt/:id',
  })

  await waitFor(() => {
    expect(screen.getByRole('tab', { name: /overview/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /secrets/i })).toBeVisible()

    expect(screen.getByRole('tab', { name: /overview/i })).toHaveAttribute(
      'data-selected',
      'true'
    )
    expect(screen.getByRole('tab', { name: /secrets/i })).not.toHaveAttribute(
      'data-selected',
      'true'
    )
  })

  await userEvent.click(screen.getByRole('tab', { name: /secrets/i }))

  await waitFor(() => {
    expect(screen.getByRole('tab', { name: /overview/i })).not.toHaveAttribute(
      'data-selected',
      'true'
    )
    expect(screen.getByRole('tab', { name: /secrets/i })).toHaveAttribute(
      'data-selected',
      'true'
    )
  })

  await userEvent.click(screen.getByRole('tab', { name: /overview/i }))

  await waitFor(() => {
    expect(screen.getByRole('tab', { name: /overview/i })).toHaveAttribute(
      'data-selected',
      'true'
    )
    expect(screen.getByRole('tab', { name: /secrets/i })).not.toHaveAttribute(
      'data-selected',
      'true'
    )
  })
})
