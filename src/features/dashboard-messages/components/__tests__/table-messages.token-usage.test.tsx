import {} from 'vitest'
import { TableMessages } from '../table-messages'
import { render, waitFor } from '@/lib/test-utils'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { TOKEN_USAGE_AGG } from '../../../../mocks/msw/mockers/token-usage.mock'
import { formatNumberCompact } from '@/lib/format-number'
import { mswEndpoint } from '@/test/msw-endpoint'
import { mockConversation } from '@/mocks/msw/mockers/conversation.mock'

vi.mock('@untitled-ui/icons-react', async () => {
  const original = await vi.importActual<
    typeof import('@untitled-ui/icons-react')
  >('@untitled-ui/icons-react')
  return {
    ...original,
    Download01: () => <div data-testid="icon-arrow-down" />,
    Upload01: () => <div data-testid="icon-arrow-up" />,
  }
})

const INPUT_TOKENS =
  TOKEN_USAGE_AGG.tokens_by_model['claude-3-5-sonnet-latest'].token_usage
    .input_tokens

const OUTPUT_TOKENS =
  TOKEN_USAGE_AGG.tokens_by_model['claude-3-5-sonnet-latest'].token_usage
    .output_tokens

test('renders token usage cell correctly', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      return HttpResponse.json([mockConversation({ withTokenUsage: true })])
    })
  )

  const { getByRole, getByTestId, queryByText } = render(<TableMessages />)

  await waitFor(() => {
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(getByTestId('icon-arrow-up')).toBeVisible()
  expect(getByTestId('icon-arrow-down')).toBeVisible()

  expect(
    getByRole('gridcell', {
      name: `${formatNumberCompact(INPUT_TOKENS)} ${formatNumberCompact(OUTPUT_TOKENS)}`,
    })
  ).toBeVisible()
})

test('renders N/A when token usage is missing', async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/messages'), () => {
      return HttpResponse.json([mockConversation({ withTokenUsage: false })])
    })
  )

  const { getByText, queryByText } = render(<TableMessages />)

  await waitFor(() => {
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  expect(getByText('N/A')).toBeVisible()
})
