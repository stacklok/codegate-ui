import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PromptList } from "../PromptList";
import mockedPrompts from "@/mocks/msw/fixtures/GetMessages.json";
import { MemoryRouter } from "react-router-dom";

describe("PromptList", () => {
  it("should render correct prompt", () => {
    render(
      <MemoryRouter>
        <PromptList prompts={[mockedPrompts[0]]} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", {
        name: /server\.py do you see any security issue\?/i,
      }),
    ).toBeVisible();
  });

  it("should render default prompt value when missing question", async () => {
    const conversationTimestamp = "2025-01-02T14:19:58.024100Z";
    render(
      <MemoryRouter>
        <PromptList
          prompts={[
            {
              question_answers: [
                {
                  question: null,
                  answer: null,
                },
              ],
              provider: "vllm",
              type: "fim",
              chat_id: "b97fbe59-0e34-4b98-8f2f-41332ebc059a",
              conversation_timestamp: conversationTimestamp,
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: `Prompt ${conversationTimestamp}`,
      }),
    ).toBeVisible();
  });
});