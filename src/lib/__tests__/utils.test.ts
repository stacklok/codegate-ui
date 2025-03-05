import { getAppConfig } from '../utils'
import { AppConfig } from '@/global'

describe('getAppConfig', () => {
  const mockViteBaseApiUrl = 'https://api.mock.com'

  it('default base api url if ${BASE_API_URL}" not configured', () => {
    const mockAppConfig: AppConfig = {
      BASE_API_URL: '${BASE_API_URL}',
    }

    Object.defineProperty(window, 'APP_CONFIG', {
      value: mockAppConfig,
      writable: true,
    })

    const expectedConfig: AppConfig = {
      ...mockAppConfig,
      BASE_API_URL: 'https://mock.codegate.ai',
    }

    expect(getAppConfig()).toEqual(expectedConfig)
  })

  it('replace base api url if ${BASE_API_URL}" is configured', () => {
    const mockAppConfig: AppConfig = {
      BASE_API_URL: mockViteBaseApiUrl,
    }

    Object.defineProperty(window, 'APP_CONFIG', {
      value: mockAppConfig,
      writable: true,
    })

    const expectedConfig: AppConfig = {
      ...mockAppConfig,
      BASE_API_URL: mockViteBaseApiUrl,
    }

    expect(getAppConfig()).toEqual(expectedConfig)
  })
})
