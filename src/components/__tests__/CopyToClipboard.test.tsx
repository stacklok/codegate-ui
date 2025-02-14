import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect } from 'vitest'
import { CopyToClipboard } from '../CopyToClipboard'

describe('CopyToClipboard', () => {
  it('renders the button with the correct icon', () => {
    render(<CopyToClipboard text="Fake text" />)

    expect(screen.getByRole('button')).toBeVisible()
    expect(screen.getByTestId('icon-clipboard-copy')).toBeVisible()
  })

  it('copies text to clipboard when clicked', async () => {
    const mockedText = vi.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockedText,
      },
    })

    render(<CopyToClipboard text="Fake text" />)

    await userEvent.click(screen.getByRole('button'))

    expect(mockedText).toHaveBeenCalledWith('Fake text')
    expect(screen.getByTestId('icon-clipboard-check')).toBeVisible()
  })
})
