import { server } from '@/mocks/msw/node'
import { http, HttpResponse } from 'msw'
import { expect } from 'vitest'

import { render, waitFor } from '@/lib/test-utils'
import { HeaderStatusMenu } from '../header-status-menu'
import userEvent from '@testing-library/user-event'
import { mswEndpoint } from '@/test/msw-endpoint'

const renderComponent = () => render(<HeaderStatusMenu />)

describe('CardCodegateStatus', () => {
  test("renders 'healthy' state", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: 'healthy' })
      )
    )

    const { getByRole } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /service healthy/i })).toBeVisible()
    })
  })

  test("renders 'unhealthy' state", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: null })
      )
    )

    const { getByRole } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /service unhealthy/i })).toBeVisible()
    })
  })

  test("renders 'error' state when health check request fails", async () => {
    server.use(http.get(mswEndpoint('/health'), () => HttpResponse.error()))

    const { getByRole } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /error/i })).toBeVisible()
    })
  })

  test("renders 'error' state when version check request fails", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: 'healthy' })
      ),
      http.get(mswEndpoint('/api/v1/version'), () => HttpResponse.error())
    )

    const { getByRole } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /error/i })).toBeVisible()
    })
  })

  test("renders 'up to date' state", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: 'healthy' })
      ),
      http.get(mswEndpoint('/api/v1/version'), () =>
        HttpResponse.json({
          current_version: 'foo',
          latest_version: 'foo',
          is_latest: true,
          error: null,
        })
      )
    )

    const { getByRole, getByText } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /service healthy/i })).toBeVisible()
    })

    await userEvent.click(getByRole('button', { name: /service healthy/i }))

    await waitFor(() => {
      expect(getByRole('dialog', { name: /codegate status/i })).toBeVisible()
      expect(getByText(/up to date/i)).toBeVisible()
    })
  })

  test("renders 'update available' state", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: 'healthy' })
      ),
      http.get(mswEndpoint('/api/v1/version'), () =>
        HttpResponse.json({
          current_version: 'foo',
          latest_version: 'bar',
          is_latest: false,
          error: null,
        })
      )
    )

    const { getByRole } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /update available/i })).toBeVisible()
    })

    await userEvent.click(getByRole('button', { name: /update available/i }))

    await waitFor(() => {
      expect(getByRole('dialog', { name: /codegate status/i })).toBeVisible()
      const role = getByRole('link', { name: /update available/i })
      expect(role).toBeVisible()
      expect(role).toHaveAttribute(
        'href',
        'https://docs.codegate.ai/how-to/install#upgrade-codegate'
      )
    })
  })

  test("renders 'version check error' state", async () => {
    server.use(
      http.get(mswEndpoint('/health'), () =>
        HttpResponse.json({ status: 'healthy' })
      ),
      http.get(mswEndpoint('/api/v1/version'), () =>
        HttpResponse.json({
          current_version: 'foo',
          latest_version: 'bar',
          is_latest: false,
          error: 'foo',
        })
      )
    )

    const { getByRole, getByText } = renderComponent()

    await waitFor(() => {
      expect(getByRole('button', { name: /service healthy/i })).toBeVisible()
    })

    await userEvent.click(getByRole('button', { name: /service healthy/i }))

    await waitFor(() => {
      expect(getByRole('dialog', { name: /codegate status/i })).toBeVisible()
      expect(getByText(/error/i)).toBeVisible()
    })
  })
})
