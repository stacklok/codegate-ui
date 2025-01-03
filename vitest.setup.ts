import { server } from "./src/mocks/msw/node";
import * as testingLibraryMatchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, beforeAll, afterAll, vi } from "vitest";

expect.extend(testingLibraryMatchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());
