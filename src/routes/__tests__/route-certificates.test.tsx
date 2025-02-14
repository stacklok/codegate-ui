import { render } from '@/lib/test-utils'
import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RouteCertificates } from '../route-certificates'

describe('Certificates', () => {
  it('should render download certificate', () => {
    render(<RouteCertificates />)
    expect(
      screen.getByRole('heading', { name: 'CodeGate CA certificate' })
    ).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Download certificate' })
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      '/certificates/security'
    )

    expect(
      screen.getByRole('heading', { name: 'Certificate Management' })
    ).toBeVisible()

    expect(screen.getByText('macOS')).toBeVisible()
    expect(screen.getByText('Windows')).toBeVisible()
    expect(screen.getByText('Linux')).toBeVisible()
  })

  it('has breadcrumbs', () => {
    render(<RouteCertificates />)

    const breadcrumbs = screen.getByRole('list', { name: 'Breadcrumbs' })
    expect(breadcrumbs).toBeVisible()
    expect(
      within(breadcrumbs).getByRole('link', { name: 'Dashboard' })
    ).toHaveAttribute('href', '/')
    expect(within(breadcrumbs).getByText(/certificates/i)).toBeVisible()
  })

  it('should render macOS certificate installation', async () => {
    render(<RouteCertificates />)

    expect(screen.getByRole('heading', { name: 'CLI method' })).toBeVisible()
    expect(screen.getByText('After downloading the certificate')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'GUI method' })).toBeVisible()
    expect(screen.getByText('Open the downloaded certificate')).toBeVisible()

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove certificate' })
    )

    expect(screen.getByRole('heading', { name: 'CLI method' })).toBeVisible()
    expect(screen.getByText('Open a terminal and run')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'GUI method' })).toBeVisible()
    expect(screen.getByText('Launch the Keychain Access app')).toBeVisible()
  })

  it('should render Windows certificate installation', async () => {
    render(<RouteCertificates />)

    await userEvent.click(screen.getByText('Windows'))

    expect(
      screen.getByText('Double-click the downloaded certificate file.')
    ).toBeVisible()

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove certificate' })
    )
    expect(screen.getByText('certmgr.msc')).toBeVisible()
  })

  it('should render Linux certificate installation', async () => {
    render(<RouteCertificates />)

    await userEvent.click(screen.getByText('Linux'))

    expect(
      screen.getByText('/usr/local/share/ca-certificates/codegate.crt')
    ).toBeVisible()

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove certificate' })
    )
    expect(screen.getByText('/usr/local/share/ca-certificates/')).toBeVisible()
  })
})
