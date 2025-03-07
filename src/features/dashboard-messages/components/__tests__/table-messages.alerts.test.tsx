import {} from 'vitest'
import { TableMessages } from '../table-messages'
import { render, screen, waitFor } from '@/lib/test-utils'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'

import { mswEndpoint } from '@/test/msw-endpoint'
import { mockConversation } from '@/mocks/msw/mockers/conversation.mock'
import { PaginatedMessagesResponse } from '@/api/generated'

it('shows zero in alerts counts when no alerts', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: [
          mockConversation({
            alertsConfig: { numAlerts: 0 },
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
          mockConversation({
            alertsConfig: { numAlerts: 10, type: 'malicious' },
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
          mockConversation({
            alertsConfig: { numAlerts: 10, type: 'secret' },
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
          mockConversation({
            alertsConfig: { numAlerts: 10, type: 'pii' },
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
