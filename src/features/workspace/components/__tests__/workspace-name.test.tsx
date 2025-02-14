import { test, expect } from 'vitest'
import { WorkspaceName } from '../workspace-name'
import { render, waitFor } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { mswEndpoint } from '@/test/msw-endpoint'

test('can rename workspace', async () => {
  const { getByRole, getByText } = render(
    <WorkspaceName workspaceName="foo-bar" isArchived={false} />
  )

  const input = getByRole('textbox', { name: /workspace name/i })
  await userEvent.clear(input)

  await userEvent.type(input, 'baz-qux')
  expect(input).toHaveValue('baz-qux')

  await userEvent.click(getByRole('button', { name: /save/i }))

  await waitFor(() => {
    expect(getByText(/renamed workspace to "baz-qux"/i)).toBeVisible()
  })
})

test("can't rename archived workspace", async () => {
  const { getByRole } = render(
    <WorkspaceName workspaceName="foo" isArchived={true} />
  )

  expect(getByRole('textbox', { name: /workspace name/i })).toBeDisabled()
  expect(getByRole('button', { name: /save/i })).toBeDisabled()
})

test("can't rename active workspace", async () => {
  server.use(
    http.get(mswEndpoint('/api/v1/workspaces/active'), () =>
      HttpResponse.json({
        workspaces: [
          {
            name: 'foo',
            is_active: true,
            last_updated: new Date(Date.now()).toISOString(),
          },
        ],
      })
    )
  )
  const { getByRole } = render(
    <WorkspaceName workspaceName="foo" isArchived={true} />
  )

  expect(getByRole('textbox', { name: /workspace name/i })).toBeDisabled()
  expect(getByRole('button', { name: /save/i })).toBeDisabled()
})

test("can't rename archived workspace", async () => {
  const { getByRole, queryByText } = render(
    <WorkspaceName workspaceName="foo" isArchived={true} />
  )

  expect(getByRole('textbox', { name: /workspace name/i })).toBeDisabled()
  expect(getByRole('button', { name: /save/i })).toBeDisabled()
  expect(
    queryByText(/cannot rename the default workspace/i)
  ).not.toBeInTheDocument()
})

test("can't rename default workspace", async () => {
  const { getByRole, getByText } = render(
    <WorkspaceName workspaceName="default" isArchived={false} />
  )

  expect(getByRole('textbox', { name: /workspace name/i })).toBeDisabled()
  expect(getByRole('button', { name: /save/i })).toBeDisabled()
  expect(getByText(/cannot rename the default workspace/i)).toBeVisible()
})
