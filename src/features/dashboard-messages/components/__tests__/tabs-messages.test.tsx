import { describe } from 'vitest'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'
import { TabsMessages } from '../tabs-messages'
import { mswEndpoint } from '@/test/msw-endpoint'
import { AlertSummary, PaginatedMessagesResponse } from '@/api/generated'
import { mockConversationSummary } from '@/mocks/msw/mockers/conversation-summary.mock'

const SUMMARY: AlertSummary = {
  malicious_packages: 13,
  pii: 9,
  secrets: 10,
  total_alerts: 32,
}

describe('tabs-messages', () => {
  beforeAll(() => {
    server.use(
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
        () => {
          const responsePayload: PaginatedMessagesResponse = {
            data: Array.from({ length: 32 }).map(() =>
              mockConversationSummary()
            ),
            limit: 50,
            offset: 0,
            total: 32,
          }

          return HttpResponse.json(responsePayload)
        }
      ),
      http.get(
        mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
        () => {
          return HttpResponse.json(SUMMARY)
        }
      )
    )
  })

  test('shows correct count of all packages', async () => {
    const { getByRole } = render(
      <TabsMessages>
        <div>foo</div>
      </TabsMessages>
    )

    await waitFor(() => {
      expect(getByRole('tab', { name: /all/i })).toHaveTextContent('32')
    })
  })

  const filteredCases = [
    {
      name: 'Malicious',
      count: SUMMARY.malicious_packages,
    },
    { name: 'Secrets', count: SUMMARY.secrets },
    { name: 'PII', count: SUMMARY.pii },
  ]

  filteredCases.forEach(({ name, count }) => {
    test(`shows correct count of ${name} packages`, async () => {
      const { getByRole } = render(
        <TabsMessages>
          <div>foo</div>
        </TabsMessages>
      )

      await waitFor(() => {
        expect(getByRole('tab', { name: name })).toHaveTextContent(
          String(count)
        )
      })
    })
  })
})
