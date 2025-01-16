import { render } from "@/lib/test-utils";
import { Chat } from "../Chat";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

vi.mock("@stacklok/ui-kit", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("@stacklok/ui-kit")>()),
    Avatar: ({ "data-testid": dataTestId }: { "data-testid": string }) => (
      <div data-testid={dataTestId} />
    ),
  };
});

vi.mock("@/hooks/usePromptsStore", () => ({
  usePromptsStore: () => ({
    ...vi.importActual("@/hooks/usePromptsStore"),
    setCurrentPromptId: vi.fn(),
    prompts: [
      {
        question_answers: [
          {
            question: {
              message:
                '\n\n```tsx src/App.tsx (23-29)\n  const apiKey = "REDACTED<$lCzMsqxUWElmZqd/qX4llR3pqsrBJVxkt6SB6WXXKKhYG37ZnscxPawjfZmgPVoSpcSR975hOIE2s/6iVr2JETpVdwdaG4hAYlzJ4tteJg==>";\n\n\n```\nDo you see any security issue?.',
              timestamp: "2025-01-02T13:42:48.721165Z",
              message_id: "031cf7a3-1ce6-435d-bbee-0f939b30cc20",
            },
            answer: {
              message:
                '**CodeGate Security Analysis**\n\nThe provided code snippet contains a string that is likely an encoded value, specifically a Base64 encoded string. Here is a detailed analysis:\n\n### Security Vulnerabilities and Potential Risks\n\n1. **Sensitive Data Handling**:\n   - The string starts with "REDACTED", indicating that it contains sensitive information that has been masked or obfuscated. However, the actual value is still present and could be potentially revealing if decoded.\n   - Using "REDACTED" is a good practice for hiding sensitive information in logs, but it\'s important to ensure that the actual sensitive data is not exposed.\n\n2. **Decoding Risks**:\n   - If the string is Base64 encoded, decoding it could reveal sensitive information such as API keys, tokens, or other credentials.\n   - Decoding and handling such sensitive data in client-side code (like `App.tsx`) can expose it to potential attackers if the data is transmitted or logged.\n\n3. **Potential for Injection**:\n   - If the decoded string is used in any form of user input or external communication, there is a risk of injection attacks (e.g., SQL injection, cross-site scripting, etc.).\n\n### Best Practices for Secure Implementation\n\n1. **Avoid Hardcoding Sensitive Data**:\n   - Never hardcode sensitive data such as API keys, tokens, or passwords directly in your source code. Use environment variables or secure vaults to manage such data.\n\n2. **Proper Encoding and Decoding**:\n   - Ensure that encoding and decoding operations are performed securely and that the decoded data is handled with care to prevent unauthorized access or usage.\n\n3. **Data Validation and Sanitization**:\n   - Always validate and sanitize any data that is used in your application. This includes checking for malicious content or unexpected formats.\n\n4. **Secure Logging**:\n   - Avoid logging sensitive data directly. If logging is necessary, ensure that sensitive information is either sanitized or replaced with placeholders.\n\n### Recommendations for Security Improvements\n\n1. **Use Environment Variables**:\n   - Replace the hardcoded string with an environment variable. For example:\n     ```typescript\n     const test = process.env.REACT_APP_REDACTED_TOKEN;\n     ```\n   - Ensure that environment variables are securely managed and not exposed in version control systems.\n\n2. **Implement Access Controls**:\n   - Restrict access to sensitive data to only those parts of your application that require it. Use role-based access controls (RBAC) to manage permissions.\n\n3. **Regular Security Audits**:\n   - Conduct regular security audits and code reviews to identify and address potential security vulnerabilities.\n\n4. **Stay Updated with Security Standards**:\n   - Follow security best practices and guidelines such as those provided by OWASP (Open Web Application Security Project) and other relevant organizations.\n\n### References to Relevant Security Standards or Guidelines\n\n- **OWASP**: [OWASP Security Guidelines](https://owasp.org/)\n- **Secure Coding Practices**: [Secure Coding Guidelines](https://www.securecoding.org/)\n- **Environment Variables**: [12factor.net - Config](https://12factor.net/config)\n\nBy following these best practices and recommendations, you can help ensure that your application handles sensitive data securely and mitigates potential security risks.',
              timestamp: "2025-01-02T13:42:49.361714Z",
              message_id: "a542408b-d0bc-4f6f-8b71-64c93c1e388a",
            },
          },
        ],
        provider: "vllm",
        type: "chat",
        chat_id: "chatcmpl-7d87679de7ed41639eb91d8ebbaa6f72",
        conversation_timestamp: "2025-01-02T13:42:48.721165Z",
      },
    ],
  }),
}));

describe("Chat", () => {
  it("should render secret issue chat", () => {
    render(<Chat />, {
      routeConfig: {
        initialEntries: ["/prompt/chatcmpl-7d87679de7ed41639eb91d8ebbaa6f72"],
      },
      pathConfig: "/prompt/:id",
    });

    expect(screen.getByText(/REDACTED</i)).toBeVisible();
    expect(screen.getByTestId("avatar-user")).toBeVisible();
    expect(screen.getByTestId("avatar-ai")).toBeVisible();
    expect(
      screen.getByText(/do you see any security issue\?\./i),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: /recommendations for security improvements/i,
      }),
    ).toBeVisible();
    const syntaxHighlighter = screen.getAllByTestId("syntax-highlighter");
    expect(syntaxHighlighter).toHaveLength(3);
    const tsCodeSnippet = syntaxHighlighter[0] as HTMLElement;
    expect(
      within(tsCodeSnippet)
        .getByRole("code")
        .className.includes("language-tsx"),
    ).toBeTruthy();
  });
});
