import { hrefs } from '@/lib/hrefs'

import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { TableActionsWorkspaces } from '../table-actions-workspaces'
import { render } from '@/lib/test-utils'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const original =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...original,
    useNavigate: () => mockNavigate,
  }
})

it('has correct actions for default workspace when not active', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'default' }}
      activeWorkspaceName="foo-bar"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  expect(activate).not.toHaveAttribute('aria-disabled', 'true')

  const edit = getByRole('menuitem', { name: /edit/i })
  expect(edit).toHaveAttribute('href', hrefs.workspaces.edit('default'))

  const archive = getByRole('menuitem', { name: /archive/i })
  expect(archive).toHaveAttribute('aria-disabled', 'true')
})

it('has correct actions for default workspace when active', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: true, isArchived: false, name: 'default' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  expect(activate).toHaveAttribute('aria-disabled', 'true')

  const edit = getByRole('menuitem', { name: /edit/i })
  expect(edit).toHaveAttribute('href', hrefs.workspaces.edit('default'))

  const archive = getByRole('menuitem', { name: /archive/i })
  expect(archive).toHaveAttribute('aria-disabled', 'true')
})

it('has correct actions for normal workspace when not active', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  expect(activate).not.toHaveAttribute('aria-disabled', 'true')

  const edit = getByRole('menuitem', { name: /edit/i })
  expect(edit).toHaveAttribute('href', hrefs.workspaces.edit('foo-bar'))

  const archive = getByRole('menuitem', { name: /archive/i })
  expect(archive).not.toHaveAttribute('aria-disabled', 'true')
})

it('has correct actions for normal workspace when active', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: true, isArchived: false, name: 'foo-bar' }}
      activeWorkspaceName="foo-bar"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  expect(activate).toHaveAttribute('aria-disabled', 'true')

  const edit = getByRole('menuitem', { name: /edit/i })
  expect(edit).toHaveAttribute('href', hrefs.workspaces.edit('foo-bar'))

  const archive = getByRole('menuitem', { name: /archive/i })
  expect(archive).toHaveAttribute('aria-disabled', 'true')
})

it('has correct actions for archived workspace', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: true, isArchived: true, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const restore = getByRole('menuitem', { name: /restore/i })
  expect(restore).not.toHaveAttribute('aria-disabled', 'true')

  const hardDelete = getByRole('menuitem', {
    name: /permanently delete/i,
  })
  expect(hardDelete).not.toHaveAttribute('aria-disabled', 'true')
})

it('can activate default workspace', async () => {
  const { getByRole, getByText } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'default' }}
      activeWorkspaceName="foo-bar"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  await userEvent.click(activate)

  await waitFor(() => {
    expect(getByText(/activated "default" workspace/i)).toBeVisible()
  })
})

it('can edit default workspace', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'default' }}
      activeWorkspaceName="foo-bar"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const edit = getByRole('menuitem', { name: /edit/i })
  await userEvent.click(edit)

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith(
      hrefs.workspaces.edit('default'),
      undefined
    )
  })
})

it('can activate normal workspace', async () => {
  const { getByRole, getByText } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const activate = getByRole('menuitem', { name: /activate/i })
  await userEvent.click(activate)

  await waitFor(() => {
    expect(getByText(/activated "foo-bar" workspace/i)).toBeVisible()
  })
})

it('can edit normal workspace', async () => {
  const { getByRole } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  const edit = getByRole('menuitem', { name: /edit/i })
  await userEvent.click(edit)

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith(
      hrefs.workspaces.edit('foo-bar'),
      undefined
    )
  })
})

it('can archive normal workspace', async () => {
  const { getByRole, getByText } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: false, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  await userEvent.click(getByRole('menuitem', { name: /archive/i }))

  await waitFor(() => {
    expect(getByText(/archived "foo-bar" workspace/i)).toBeVisible()
  })
})

it('can restore archived workspace', async () => {
  const { getByRole, getByText } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: true, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  await userEvent.click(getByRole('menuitem', { name: /restore/i }))

  await waitFor(() => {
    expect(getByText(/restored "foo-bar" workspace/i)).toBeVisible()
  })
})

it('can permanently delete archived workspace', async () => {
  const { getByRole, getByText } = render(
    <TableActionsWorkspaces
      workspace={{ is_active: false, isArchived: true, name: 'foo-bar' }}
      activeWorkspaceName="default"
    />
  )

  await userEvent.click(getByRole('button', { name: /actions/i }))

  await waitFor(() => {
    expect(getByRole('menu')).toBeVisible()
  })

  await userEvent.click(getByRole('menuitem', { name: /permanently/i }))

  await waitFor(() => {
    expect(getByRole('dialog', { name: /permanently delete/i })).toBeVisible()
  })

  await userEvent.click(getByRole('button', { name: /delete/i }))

  await waitFor(() => {
    expect(getByText(/permanently deleted "foo-bar" workspace/i)).toBeVisible()
  })
})
