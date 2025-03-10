import { getAppConfig } from '../utils'
import { AppConfig } from '@/global'

describe('getAppConfig', () => {
  const mockViteBaseApiUrl = 'https://api.mock.com'

  it('default base api url if ${DASHBOARD_API_BASE_URL}" not configured', () => {
    const mockAppConfig: AppConfig = {
      DASHBOARD_API_BASE_URL: '${DASHBOARD_API_BASE_URL}',
    }

    Object.defineProperty(window, 'APP_CONFIG', {
      value: mockAppConfig,
      writable: true,
    })

    const expectedConfig: AppConfig = {
      ...mockAppConfig,
      DASHBOARD_API_BASE_URL: 'https://mock.codegate.ai',
    }

    expect(getAppConfig()).toEqual(expectedConfig)
  })

  it('replace base api url if ${DASHBOARD_API_BASE_URL}" is configured', () => {
    const mockAppConfig: AppConfig = {
      DASHBOARD_API_BASE_URL: mockViteBaseApiUrl,
    }

    Object.defineProperty(window, 'APP_CONFIG', {
      value: mockAppConfig,
      writable: true,
    })

    const expectedConfig: AppConfig = {
      ...mockAppConfig,
      DASHBOARD_API_BASE_URL: mockViteBaseApiUrl,
    }

    expect(getAppConfig()).toEqual(expectedConfig)
  })
})
