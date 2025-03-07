import { server } from '@/mocks/msw/node'
import { test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'

import { AlertsSummaryMaliciousSecrets } from '../alerts-summary-secrets'
import { mswEndpoint } from '@/test/msw-endpoint'
import { AlertSummary } from '@/api/generated'

test('shows correct count when there is a secret alert', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
      () => {
        const response: AlertSummary = {
          malicious_packages: 0,
          pii: 0,
          secrets: 1,
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />)

  await waitFor(() => {
    expect(getByTestId('secrets-count')).toHaveTextContent('1')
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
        }
        return HttpResponse.json(response)
      }
    )
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />)

  await waitFor(() => {
    expect(getByTestId('secrets-count')).toHaveTextContent('0')
  })
})
