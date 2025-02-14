import { server } from '@/mocks/msw/node'
import { test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { render, waitFor } from '@/lib/test-utils'
import { AlertsSummaryMaliciousPkg } from '../alerts-summary-malicious-pkg'

import { mswEndpoint } from '@/test/msw-endpoint'
import { mockAlert } from '@/mocks/msw/mockers/alert.mock'

test('shows correct count when there is a malicious alert', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/alerts'), () => {
      return HttpResponse.json([mockAlert({ type: 'malicious' })])
    })
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />)

  await waitFor(() => {
    expect(getByTestId('malicious-count')).toHaveTextContent('1')
  })
})

test('shows correct count when there is no malicious alert', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/alerts'), () => {
      return HttpResponse.json([mockAlert({ type: 'secret' })])
    })
  )

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />)

  await waitFor(() => {
    expect(getByTestId('malicious-count')).toHaveTextContent('0')
  })
})
