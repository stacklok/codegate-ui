import {} from 'vitest'
import { TableMessages } from '../table-messages'
import { render, screen, waitFor, within } from '@/lib/test-utils'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'

import { mswEndpoint } from '@/test/msw-endpoint'
import { mockConversation } from '@/mocks/msw/mockers/conversation.mock'
import userEvent from '@testing-library/user-event'
import { PaginatedMessagesResponse } from '@/api/generated'

/**
 *
 * NOTE: This needs to be totally re-written — will do so in a follow up
 * @see https://github.com/stacklok/codegate-ui/issues/370
 */
it.skip('allows pagination', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      const responsePayload: PaginatedMessagesResponse = {
        data: Array.from({ length: 35 }).map(() =>
          mockConversation({
            alertsConfig: {
              type: 'secret',
              numAlerts: 10,
            },
          })
        ),
        limit: 50,
        offset: 0,
        total: 35,
      }

      return HttpResponse.json(responsePayload)
    })
  )

  render(<TableMessages />)

  await waitFor(
    async () => {
      await userEvent.click(screen.getByRole('button', { name: /next/i }))

      expect(
        within(screen.getByTestId('messages-table')).getAllByRole('row').length
      ).toBeLessThan(16)
    },
    { timeout: 5000 }
  )

  // on the last page, we cannot go further
  expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()

  await userEvent.click(screen.getByRole('button', { name: /previous/i }))
  expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
  expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()

  await waitFor(async () => {
    await userEvent.click(screen.getByRole('button', { name: /previous/i }))

    // once we reach the first page, we cannot paginate backwards anymore
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()

    expect(
      within(screen.getByTestId('messages-table')).getAllByRole('row').length
    ).toEqual(16)
  })
})
