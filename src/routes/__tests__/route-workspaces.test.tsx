import { render } from '@/lib/test-utils'
import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RouteWorkspaces } from '../route-workspaces'

describe('Workspaces page', () => {
  beforeEach(() => {
    render(<RouteWorkspaces />)
  })

  it('has breadcrumbs', () => {
    const breadcrumbs = screen.getByRole('list', { name: 'Breadcrumbs' })
    expect(breadcrumbs).toBeVisible()
    expect(
      within(breadcrumbs).getByRole('link', { name: 'Dashboard' })
    ).toHaveAttribute('href', '/')
    expect(within(breadcrumbs).getByText(/manage workspaces/i)).toBeVisible()
  })

  it('has a title', () => {
    expect(
      screen.getByRole('heading', { name: /manage workspaces/i })
    ).toBeVisible()
  })

  it('has a table with the correct columns', () => {
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeVisible()
  })

  it('has a row for each workspace', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1)
    })

    expect(
      screen.getByRole('rowheader', { name: /myworkspace/i })
    ).toBeVisible()
    expect(
      screen.getByRole('rowheader', { name: /anotherworkspae/i })
    ).toBeVisible()

    const firstRow = screen.getByRole('row', { name: /myworkspace/i })

    expect(firstRow).toHaveAttribute('data-href', '/workspace/myworkspace')
  })

  it('has archived workspace', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1)
    })

    expect(
      screen.getByRole('rowheader', { name: /archived_workspace/i })
    ).toBeVisible()
  })
})
