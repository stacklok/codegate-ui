import { server } from '@/mocks/msw/node'
import { test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'

import { mswEndpoint } from '@/test/msw-endpoint'
import { AlertSummary } from '@/api/generated'
import { AlertsSummaryPii } from '../alerts-summary-pii'

test('shows correct count when there is a pii alert', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
      () => {
        const response: AlertSummary = {
          malicious_packages: 0,
          pii: 1,
          secrets: 0,
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryPii />)

  await waitFor(() => {
    expect(getByTestId('pii-count')).toHaveTextContent('1')
  })
})

test('shows correct count when there is no pii alert', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
      () => {
        const response: AlertSummary = {
          malicious_packages: 0,
          pii: 0,
          secrets: 0,
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryPii />)

  await waitFor(() => {
    expect(getByTestId('pii-count')).toHaveTextContent('0')
  })
})
