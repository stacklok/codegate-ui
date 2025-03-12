import {} from 'vitest'
import { TableMessages } from '../table-messages'
import { render, screen, waitFor } from '@/lib/test-utils'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'

import { mswEndpoint } from '@/test/msw-endpoint'
import { PaginatedMessagesResponse } from '@/api/generated'
import { mockConversationSummary } from '@/mocks/msw/mockers/conversation-summary.mock'

it('shows zero in alerts counts when no alerts', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: [mockConversationSummary()],
        limit: 50,
        offset: 0,
        total: 30,
      }

      return HttpResponse.json(responsePayload)
    })
  )
  render(<TableMessages />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(
    screen.getByRole('button', {
      name: /malicious packages count/i,
    })
  ).toHaveTextContent('0')
  expect(
    screen.getByRole('button', {
      name: /secrets count/i,
    })
  ).toHaveTextContent('0')
  expect(
    screen.getByRole('button', {
      name: /personally identifiable information.*count/i,
    })
  ).toHaveTextContent('0')
})

it('shows count of malicious alerts in row', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: [
          mockConversationSummary({
            alertsSummary: {
              malicious_packages: 10,
              pii: 0,
              secrets: 0,
              total_alerts: 10,
            },
          }),
        ],
        limit: 50,
        offset: 0,
        total: 30,
      }

      return HttpResponse.json(responsePayload)
    })
  )

  render(<TableMessages />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(
    screen.getByRole('button', {
      name: /malicious packages count/i,
    })
  ).toHaveTextContent('10')
})

it('shows count of secret alerts in row', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: [
          mockConversationSummary({
            alertsSummary: {
              malicious_packages: 0,
              pii: 0,
              secrets: 10,
              total_alerts: 10,
            },
          }),
        ],
        limit: 50,
        offset: 0,
        total: 30,
      }

      return HttpResponse.json(responsePayload)
    })
  )
  render(<TableMessages />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(
    screen.getByRole('button', {
      name: /secrets count/i,
    })
  ).toHaveTextContent('10')
})

it('shows count of pii alerts in row', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: [
          mockConversationSummary({
            alertsSummary: {
              malicious_packages: 0,
              pii: 10,
              secrets: 0,
              total_alerts: 10,
            },
          }),
        ],
        limit: 50,
        offset: 0,
        total: 30,
      }

      return HttpResponse.json(responsePayload)
    })
  )
  render(<TableMessages />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(
    screen.getByRole('button', {
      name: /pii/i,
    })
  ).toHaveTextContent('10')
})
