import { render } from '@/lib/test-utils'
import { screen, waitFor, within } from '@testing-library/react'
import { expect, it } from 'vitest'

import userEvent from '@testing-library/user-event'
import { RouteDashboard } from '../route-dashboard'

it('should mount alert summaries', async () => {
  render(<RouteDashboard />)

  expect(
    screen.getByRole('heading', { name: /workspace token usage/i })
  ).toBeVisible()

  expect(
    screen.getByRole('heading', { name: /secrets redacted/i })
  ).toBeVisible()

  expect(
    screen.getByRole('heading', { name: /malicious packages/i })
  ).toBeVisible()
})

it('should render messages table', async () => {
  render(<RouteDashboard />)

  expect(
    screen.getByRole('grid', {
      name: /alerts table/i,
    })
  ).toBeVisible()
})

it('shows only conversations with secrets when you click on the secrets tab', async () => {
  render(<RouteDashboard />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  await userEvent.click(
    screen.getByRole('tab', {
      name: /secrets/i,
    })
  )

  const tbody = screen.getAllByRole('rowgroup')[1] as HTMLElement

  await waitFor(() => {
    const secretsCountButtons = within(tbody).getAllByRole('button', {
      name: /secrets count/,
    }) as HTMLElement[]
    secretsCountButtons.forEach((e) => {
      expect(e).toHaveTextContent('10')
    })
  })
})

it('shows only conversations with pii when you click on the secrets tab', async () => {
  render(<RouteDashboard />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  await userEvent.click(
    screen.getByRole('tab', {
      name: /pii/i,
    })
  )

  const tbody = screen.getAllByRole('rowgroup')[1] as HTMLElement

  await waitFor(() => {
    const secretsCountButtons = within(tbody).getAllByRole('button', {
      name: /personally identifiable information \(PII\) count/,
    }) as HTMLElement[]
    secretsCountButtons.forEach((e) => {
      expect(e).toHaveTextContent('10')
    })
  })
})

it('shows only conversations with malicious when you click on the malicious tab', async () => {
  render(<RouteDashboard />)

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  await userEvent.click(
    screen.getByRole('tab', {
      name: /malicious/i,
    })
  )

  const tbody = screen.getAllByRole('rowgroup')[1] as HTMLElement

  await waitFor(() => {
    const secretsCountButtons = within(tbody).getAllByRole('button', {
      name: /malicious packages count/,
    }) as HTMLElement[]
    secretsCountButtons.forEach((e) => {
      expect(e).toHaveTextContent('10')
    })
  })
})
