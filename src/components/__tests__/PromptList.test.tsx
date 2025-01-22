import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { PromptList } from "../PromptList";
import mockedPrompts from "@/mocks/msw/fixtures/GET_MESSAGES.json";
import { render } from "@/lib/test-utils";
import { Conversation } from "@/api/generated";

const conversationTimestamp = "2025-01-02T14:19:58.024100Z";
const prompt = mockedPrompts[0] as Conversation;

const testCases: [string, { message: string; expected: RegExp | string }][] = [
  [
    "codegate cmd",
    {
      message: "codegate workspace -h",
      expected: /codegate workspace -h/i,
    },
  ],
  [
    "render code with path",
    {
      message: "// Path: src/lib/utils.ts",
      expected: /Prompt on filepath: src\/lib\/utils.ts/i,
    },
  ],
  [
    "render code with file path",
    {
      message: "<file> ```tsx // filepath: /tests/my-test.tsx import",
      expected: /Prompt on file\/\/ filepath: \/tests\/my-test.tsx/i,
    },
  ],
  [
    "render snippet",
    {
      message:
        'Compare this snippet from src/test.ts: // import { fakePkg } from "fake-pkg";',
      expected: /Prompt from snippet compare this snippet from src\/test.ts:/i,
    },
  ],
  [
    "render fallback",
    {
      message:
        "<file> ```Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      expected: "Prompt 2025/01/03 - 10:09:33 AM",
    },
  ],
];

describe("PromptList", () => {
  it("render prompt", () => {
    render(<PromptList prompts={[prompt]} />);
    expect(
      screen.getByRole("link", {
        name: /server\.py do you see any security issue\?/i,
      }),
    ).toBeVisible();
  });

  it.each(testCases)("%s", (_title: string, { message, expected }) => {
    render(
      <PromptList
        prompts={[
          {
            ...prompt,
            question_answers: [
              {
                answer: {
                  message: "Mock AI answer",
                  message_id: "fake_ai_id",
                  timestamp: conversationTimestamp,
                },
                question: {
                  message,
                  message_id: "fake_id",
                  timestamp: conversationTimestamp,
                },
              },
            ],
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: expected,
      }),
    ).toBeVisible();
  });
});
