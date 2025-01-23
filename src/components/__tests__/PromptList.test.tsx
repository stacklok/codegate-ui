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
    "render default",
    {
      message:
        "I know that this local proxy can forward requests to api.foo.com.\n\napi.foo.com will validate whether the connection si trusted using a certificate authority added on the local machine, specifically whether they allow SSL and x.509 basic policy.\n\nI need to be able to validate the proxys ability to make requests to api.foo.com. I only have access to code that can run in the browser. I can infer this based on a successful request. Be creative.",
      expected:
        "I know that this local proxy can forward requests to api.foo.com. api.foo.com will validate whether the connection si trusted using a certificate authority added on the local machine, specifically whether they allow SSL and x.509 basic policy. I need to be able to validate the proxys ability to make requests to api.foo.com. I only have access to code that can run in the browser. I can infer this based on a successful request. Be creative.",
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
