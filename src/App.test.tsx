import { render } from '@/lib/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('should render header', async () => {
    render(<App />)
    expect(screen.getByText('Settings')).toBeVisible()
    expect(screen.getByText('Help')).toBeVisible()
    expect(screen.getByRole('banner', { name: 'App header' })).toBeVisible()
    expect(screen.getByRole('heading', { name: /codeGate/i })).toBeVisible()

    await userEvent.click(screen.getByText('Settings'))
    expect(
      screen.getByRole('menuitem', {
        name: /providers/i,
      })
    ).toBeVisible()
    expect(
      screen.getByRole('menuitem', {
        name: /certificate security/i,
      })
    ).toBeVisible()
    expect(
      screen.getByRole('menuitem', {
        name: /download/i,
      })
    ).toBeVisible()

    await userEvent.click(screen.getByText('Settings'))
    await userEvent.click(screen.getByText('Help'))

    expect(
      screen.getByRole('menuitem', {
        name: /use with continue/i,
      })
    ).toBeVisible()

    expect(
      screen.getByRole('menuitem', {
        name: /use with copilot/i,
      })
    ).toBeVisible()

    expect(
      screen.getByRole('menuitem', {
        name: /documentation/i,
      })
    ).toBeVisible()

    const discordMenuItem = screen.getByRole('menuitem', {
      name: /discord/i,
    })
    expect(discordMenuItem).toBeVisible()
    expect(discordMenuItem).toHaveAttribute(
      'href',
      'https://discord.gg/stacklok'
    )

    const githubMenuItem = screen.getByRole('menuitem', {
      name: /github/i,
    })
    expect(githubMenuItem).toBeVisible()
    expect(githubMenuItem).toHaveAttribute(
      'href',
      'https://github.com/stacklok/codegate'
    )

    const youtubeMenuItem = screen.getByRole('menuitem', {
      name: /youtube/i,
    })
    expect(youtubeMenuItem).toBeVisible()
    expect(youtubeMenuItem).toHaveAttribute(
      'href',
      'https://www.youtube.com/@Stacklok'
    )

    await userEvent.click(screen.getByText('Help'))

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /codeGate/i })).toBeVisible()
    )
  })

  it('should render workspaces dropdown', async () => {
    render(<App />)

    await waitFor(() =>
      expect(screen.getByRole('link', { name: 'CodeGate' })).toBeVisible()
    )

    const workspaceSelectionButton = screen.getByRole('button', {
      name: 'Active workspace default',
    })
    await waitFor(() => expect(workspaceSelectionButton).toBeVisible())

    await userEvent.click(workspaceSelectionButton)

    await waitFor(() =>
      expect(
        screen.getByRole('option', {
          name: /anotherworkspae/i,
        })
      ).toBeVisible()
    )
  })
})
