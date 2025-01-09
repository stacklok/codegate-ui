import { server } from "./src/mocks/msw/node";
import * as testingLibraryMatchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, beforeAll, afterAll, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";

class MockEventSource {
  onmessage: ((event: MessageEvent) => void) | null = null;

  constructor() {}

  close() {}

  triggerMessage(data: string) {
    if (this.onmessage) {
      this.onmessage({ data } as MessageEvent);
    }
  }
}

expect.extend(testingLibraryMatchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });

  global.window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  global.EventSource = MockEventSource as unknown as typeof EventSource;

  global.ResizeObserver = class ResizeObserver {
    disconnect() {
      // do nothing
    }
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
  };
});
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});
