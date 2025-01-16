import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useBreadcrumb } from "../useBreadcrumb";
import { MemoryRouter } from "react-router-dom";
import { TestQueryClientProvider } from "@/lib/test-utils";

vi.mock("../usePromptsData", () => ({
  usePromptsData: vi.fn(() => ({
    data: [
      {
        chat_id: "test-chat-id",
        question_answers: [
          {
            question: { message: "Fake question" },
            answer: { message: "Fake answer" },
          },
        ],
      },
    ],
  })),
}));

vi.mock("../useCurrentPromptStore", () => ({
  useCurrentPromptStore: vi.fn(() => ({
    currentPromptId: "test-chat-id",
  })),
}));

describe("useBreadcrumb", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    { path: "/certificates/security", expected: "Certificate Security" },
    { path: "/certificates", expected: "Certificate Download" },
    { path: "/help/continue-setup", expected: "Continue Setup" },
    { path: "/help/copilot-setup", expected: "Copilot Setup" },
    { path: "/prompt/", expected: "Fake question" },
    { path: "/", expected: "" },
  ])("returns breadcrumb for path $path", ({ path, expected }) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TestQueryClientProvider>
        <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
      </TestQueryClientProvider>
    );

    const { result } = renderHook(() => useBreadcrumb(), { wrapper });

    expect(result.current).toBe(expected);
  });
});
