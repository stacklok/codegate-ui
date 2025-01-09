import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useSse } from "../useSse";

const mockSendNotification = vi.fn();
vi.mock("../useBrowserNotification", () => ({
  useBrowserNotification: vi.fn(() => {
    return { sendNotification: mockSendNotification };
  }),
}));

class MockEventSource {
  static instances: MockEventSource[] = [];
  private _onmessage: ((event: MessageEvent) => void) | null = null;

  constructor() {
    MockEventSource.instances.push(this);
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(handler: ((event: MessageEvent) => void) | null) {
    this._onmessage = handler;
  }

  close() {}

  static triggerMessage(data: string) {
    MockEventSource.instances.forEach((instance) => {
      if (instance.onmessage) {
        instance.onmessage({ data } as MessageEvent);
      }
    });
  }
}

let originalEventSource: typeof EventSource;

describe("useSse", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      useLocation: vi.fn(() => ({ pathname: "/" })),
    }));

    vi.useFakeTimers();
    originalEventSource = global.EventSource;
    global.EventSource = MockEventSource as unknown as typeof EventSource;

    Object.defineProperty(global, "location", {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    global.EventSource = originalEventSource;
  });

  it("should send notification if new alert is detected", () => {
    renderHook(() => useSse());

    expect(MockEventSource.instances.length).toBe(1);
    const instance = MockEventSource.instances[0];
    expect(instance).toBeDefined();

    expect(instance.onmessage).toBeDefined();

    act(() => {
      MockEventSource.triggerMessage("new alert detected");
    });

    expect(mockSendNotification).toHaveBeenCalledWith("CodeGate Dashboard", {
      body: "New Alert detected!",
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(global.location.reload).toHaveBeenCalled();
  });

  it("should send notification if new alert is detected", () => {
    renderHook(() => useSse());

    act(() => {
      MockEventSource.triggerMessage("other message");
    });

    expect(mockSendNotification).not.toHaveBeenCalledWith(
      "CodeGate Dashboard",
      {
        body: "New Alert detected!",
      },
    );
  });
});
