import { server } from '@/mocks/msw/node'
import { test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'
import { AlertsSummaryMaliciousPkg } from '../alerts-summary-malicious-pkg'

import { mswEndpoint } from '@/test/msw-endpoint'
import { AlertSummary } from '@/api/generated'

test('shows correct count when there is a malicious alert', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
      () => {
        const response: AlertSummary = {
          malicious_packages: 1,
          pii: 0,
          secrets: 0,
          total_alerts: 1,
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />)

  await waitFor(() => {
    expect(getByTestId('malicious-count')).toHaveTextContent('1')
  })
})

test('shows correct count when there is no malicious alert', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
      () => {
        const response: AlertSummary = {
          malicious_packages: 0,
          pii: 0,
          secrets: 0,
          total_alerts: 0,
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />)

  await waitFor(() => {
    expect(getByTestId('malicious-count')).toHaveTextContent('0')
  })
})
