import { WorkspaceCreation } from '../workspace-creation'
import { render } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const original =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...original,
    useNavigate: () => mockNavigate,
  }
})

test('create workspace', async () => {
  render(<WorkspaceCreation />)

  expect(screen.getByText(/name/i)).toBeVisible()

  await userEvent.type(screen.getByRole('textbox'), 'workspaceA')
  await userEvent.click(screen.getByRole('button', { name: /create/i }))
  await waitFor(() => expect(mockNavigate).toBeCalled())

  await waitFor(() => {
    expect(screen.getByText(/created "(.*)" workspace/i)).toBeVisible()
  })
})

test('create workspace with enter button', async () => {
  render(<WorkspaceCreation />)

  expect(screen.getByText(/name/i)).toBeVisible()

  await userEvent.type(screen.getByRole('textbox'), 'workspaceA{enter}')
  await waitFor(() => expect(mockNavigate).toBeCalled())

  await waitFor(() => {
    expect(screen.getByText(/created "(.*)" workspace/i)).toBeVisible()
  })
})
