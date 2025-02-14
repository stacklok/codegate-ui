import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'
import { TabsMessages } from '../tabs-messages'
import { mswEndpoint } from '@/test/msw-endpoint'
import { mockConversation } from '@/mocks/msw/mockers/conversation.mock'

test('shows correct count of all packages', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      return HttpResponse.json([
        ...Array.from({ length: 13 }).map(() =>
          mockConversation({
            alertsConfig: {
              type: 'secret',
              numAlerts: 1,
            },
          })
        ),
        ...Array.from({ length: 13 }).map(() =>
          mockConversation({
            alertsConfig: {
              type: 'malicious',
              numAlerts: 1,
            },
          })
        ),
      ])
    })
  )

  const { getByRole } = render(
    <TabsMessages>
      <div>foo</div>
    </TabsMessages>
  )

  await waitFor(() => {
    expect(getByRole('tab', { name: /all/i })).toHaveTextContent('26')
  })
})

test('shows correct count of malicious packages', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      return HttpResponse.json(
        Array.from({ length: 13 }).map(() =>
          mockConversation({
            alertsConfig: {
              type: 'malicious',
              numAlerts: 1,
            },
          })
        )
      )
    })
  )

  const { getByRole } = render(
    <TabsMessages>
      <div>foo</div>
    </TabsMessages>
  )

  await waitFor(() => {
    expect(getByRole('tab', { name: /malicious/i })).toHaveTextContent('13')
  })
})

test('shows correct count of secret packages', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      return HttpResponse.json(
        Array.from({ length: 13 }).map(() =>
          mockConversation({
            alertsConfig: {
              type: 'secret',
              numAlerts: 1,
            },
          })
        )
      )
    })
  )

  const { getByRole } = render(
    <TabsMessages>
      <div>foo</div>
    </TabsMessages>
  )

  await waitFor(() => {
    expect(getByRole('tab', { name: /secrets/i })).toHaveTextContent('13')
  })
})
