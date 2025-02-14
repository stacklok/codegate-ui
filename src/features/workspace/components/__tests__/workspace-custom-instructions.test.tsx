import { render, waitFor } from '@/lib/test-utils'
import { expect, test } from 'vitest'

import userEvent from '@testing-library/user-event'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { WorkspaceCustomInstructions } from '../workspace-custom-instructions'
import { mswEndpoint } from '@/test/msw-endpoint'

vi.mock('@monaco-editor/react', () => {
  const FakeEditor = vi.fn((props) => {
    return (
      <textarea
        data-auto={props.wrapperClassName}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      ></textarea>
    )
  })
  return { default: FakeEditor }
})

const renderComponent = () =>
  render(<WorkspaceCustomInstructions isArchived={false} workspaceName="foo" />)

test('can update custom instructions', async () => {
  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/custom-instructions'),
      () => {
        return HttpResponse.json({ prompt: 'initial prompt from server' })
      }
    )
  )

  const { getByRole, getByText } = renderComponent()

  await waitFor(() => {
    expect(getByRole('textbox')).toBeVisible()
  })

  const input = getByRole('textbox')
  expect(input).toHaveTextContent('initial prompt from server')

  await userEvent.clear(input)
  await userEvent.type(input, 'new prompt from test')
  expect(input).toHaveTextContent('new prompt from test')

  server.use(
    http.get(
      mswEndpoint('/api/v1/workspaces/:workspace_name/custom-instructions'),
      () => {
        return HttpResponse.json({ prompt: 'new prompt from test' })
      }
    )
  )

  await userEvent.click(getByRole('button', { name: /Save/i }))

  await waitFor(() => {
    expect(getByText(/successfully updated custom instructions/i)).toBeVisible()
  })

  await waitFor(() => {
    expect(input).toHaveTextContent('new prompt from test')
  })
})
