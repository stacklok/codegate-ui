import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useSse } from '../useSse'
import { TestQueryClientProvider } from '@/lib/test-utils'

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(() => ({ pathname: '/' })),
}))

const mockInvalidate = vi.fn()

vi.mock('@tanstack/react-query', async () => {
  const original = await vi.importActual<
    typeof import('@tanstack/react-query')
  >('@tanstack/react-query')
  return {
    ...original,
    useQueryClient: () => ({
      invalidateQueries: mockInvalidate,
    }),
  }
})

class MockEventSource {
  static instances: MockEventSource[] = []
  private _onmessage: ((event: MessageEvent) => void) | null = null

  constructor() {
    MockEventSource.instances.push(this)
  }

  get onmessage() {
    return this._onmessage
  }

  set onmessage(handler: ((event: MessageEvent) => void) | null) {
    this._onmessage = handler
  }

  close() {}

  static triggerMessage(data: string) {
    MockEventSource.instances.forEach((instance) => {
      if (instance.onmessage) {
        instance.onmessage({ data } as MessageEvent)
      }
    })
  }
}

let originalEventSource: typeof EventSource

describe('useSse', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    originalEventSource = global.EventSource
    global.EventSource = MockEventSource as unknown as typeof EventSource

    Object.defineProperty(global, 'location', {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    })
  })

  afterAll(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    global.EventSource = originalEventSource
  })

  it('should invalidate queries if new alert is detected', () => {
    renderHook(() => useSse(), { wrapper: TestQueryClientProvider })

    expect(MockEventSource.instances.length).toBe(1)
    const instance = MockEventSource.instances[0]
    expect(instance).toBeDefined()

    expect(instance?.onmessage).toBeDefined()

    act(() => {
      MockEventSource.triggerMessage('new alert detected')
    })

    expect(mockInvalidate).toHaveBeenCalled()
  })
})
