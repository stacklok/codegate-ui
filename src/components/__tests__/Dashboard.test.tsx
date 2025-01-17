import { render } from "@/lib/test-utils";
import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dashboard } from "../Dashboard";
import { faker } from "@faker-js/faker";
import React from "react";
import { server } from "@/mocks/msw/node";
import { HttpResponse, http } from "msw";
import mockedAlerts from "@/mocks/msw/fixtures/GET_ALERTS.json";
import userEvent from "@testing-library/user-event";

vi.mock("recharts", async (importOriginal) => {
  const originalModule = (await importOriginal()) as Record<string, unknown>;
  return {
    ...originalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => {
      return <div data-testid="mock-responsive-container">{children}</div>;
    },
  };
});

const fakeConversionation1 = {
  conversation: {
    question_answers: [
      {
        question: {
          message:
            "\n\n```tsx src/App.tsx (23-29)\n  const { prompts, loading, fetchPrompts } = usePromptsStore();\n  useSse();\n\n  const test = \"REDACTED<$lCzMsqxUWElmZqd/qX4llR3pqsrBJVxkt6SB6WXXKKhYG37ZnscxPawjfZmgPVoSpcSR975hOIE2s/6iVr2JETpVdwdaG4hAYlzJ4tteJg==>\";\n  const breadcrumb = useBreadcrumb();\n\n\n```\nPlease explain the cause of this error and how to solve it: 'test' is declared but its value is never read.",
          timestamp: "2025-01-02T13:42:48.617799Z",
          message_id: "c8a6afd1-98d7-43c4-97ff-7b183b8f6a5f",
        },
        answer: {
          message:
            'The error message "\'test\' is declared but its value is never read" indicates that the variable `test` is defined in your code, but it is never used anywhere. This can lead to confusion for other developers reading the code and might indicate that the intended functionality has not been implemented.\n\n### Cause of the Error\n\n1. **Unused Variable**: The variable `test` is declared but not used in the rest of the code within the `App` component. This can be a result of incomplete implementation or a placeholder that was meant to be used later but was forgotten.\n\n### How to Solve It\n\nYou have a few options to resolve this issue:\n\n1. **Remove the Unused Variable**:\n   - If the variable is not needed, you can safely remove it to clean up the code and eliminate the warning.\n\n   ```tsx\n   const { prompts, loading, fetchPrompts } = usePromptsStore();\n   useSse();\n\n   const breadcrumb = useBreadcrumb();\n\n   useEffect(() => {\n     fetchPrompts();\n   }, [fetchPrompts]);\n   ```\n\n2. **Use the Variable**:\n   - If the variable is intended to be used, ensure that it is utilized somewhere in the component. For example, you could log it for debugging purposes or use it in some part of the application logic.\n\n   ```tsx\n   const { prompts, loading, fetchPrompts } = usePromptsStore();\n   useSse();\n\n   const test = "REDACTED<$lCzMsqxUWElmZqd/qX4llR3pqsrBJVxkt6SB6WXXKKhYG37ZnscxPawjfZmgPVoSpcSR975hOIE2s/6iVr2JETpVdwdaG4hAYlzJ4tteJg==>";\n   const breadcrumb = useBreadcrumb();\n\n   useEffect(() => {\n     console.log(test); // Example usage\n     fetchPrompts();\n   }, [fetchPrompts]);\n   ```\n\n3. **Suppress the Warning (Not Recommended)**:\n   - If you are sure that the variable is intentionally unused and do not want to remove it, you can suppress the warning. However, this is generally not recommended as it can lead to oversight of real issues.\n\n   ```tsx\n   // @ts-ignore\n   const test = "REDACTED<$lCzMsqxUWElmZqd/qX4llR3pqsrBJVxkt6SB6WXXKKhYG37ZnscxPawjfZmgPVoSpcSR975hOIE2s/6iVr2JETpVdwdaG4hAYlzJ4tteJg==>";\n   const breadcrumb = useBreadcrumb();\n   ```\n\n### Best Practices\n\n- **Keep Code Clean**: Regularly clean up unused variables to maintain a clean and understandable codebase.\n- **Use Linters**: Utilize tools like ESLint to automatically detect and flag unused variables, helping you maintain code quality.\n\nBy addressing this issue, you can improve the maintainability and readability of your code.',
          timestamp: "2025-01-02T13:42:49.361714Z",
          message_id: "a542408b-d0bc-4f6f-8b71-64c93c1e388a",
        },
      },
    ],
    provider: "vllm",
    type: "chat",
    chat_id: "chatcmpl-7d87679de7ed41639eb91d8ebbaa6f72",
    conversation_timestamp: "2025-01-02T13:42:48.617799Z",
  },
  alert_id: "c8a6afd1-98d7-43c4-97ff-7b183b8f6a5f",
  code_snippet: null,
  trigger_string:
    'GitHub - Access Token:\n  useSse();\n\n  const test = "ghp_token";\n  const breadcrumb = useBreadcrumb();\n\n',
  trigger_type: "codegate-secrets",
  trigger_category: "critical",
  timestamp: "2025-01-02T13:42:48.617799Z",
};

const fakeConversionation2 = {
  conversation: {
    question_answers: [
      {
        question: {
          message:
            '\n\n```py testing_file.py (1-15)\nimport invokehttp\nimport fastapi\nfrom fastapi import FastAPI, Request, Response, HTTPException\nimport numpy\n\n\n@app.route("/providers", methods=["GET"])\ndef get_providers():\n    return jsonify([provider.to_dict() for provider in registry.providers])\n\nGITHUB_TOKEN="ghp_token"\n\nif __name__ == "__main__":\n    app.run()\n\n```\nare there malicious?',
          timestamp: "2024-12-09T17:50:04.418017Z",
          message_id: "fa53ba0d-4fb0-4770-a563-88e504af621f",
        },
        answer: {
          message:
            'Warning: CodeGate detected one or more potentially malicious or archived packages.\n- Pkg 1: [trustypkg.dev/pypi/invokehttp](https://www.trustypkg.dev/pypi/invokehttp)\n\nYes, there is a security concern in your code. The `invokehttp` package is known to be malicious and should not be used in your project. Here\'s how to make your code more secure:\n\n1. Remove the malicious package and replace it with safe alternatives:\n   - Instead of `invokehttp`, you can use well-maintained packages like `requests` or `httpx` for HTTP requests\n   \nHere\'s the corrected version:\n\n```python testing_file.py\nimport requests  # or httpx\nimport fastapi\nfrom fastapi import FastAPI, Request, Response, HTTPException\nimport numpy\n\n\n@app.route("/providers", methods=["GET"])\ndef get_providers():\n    return jsonify([provider.to_dict() for provider in registry.providers])\n\nGITHUB_TOKEN="REDACTED<$SoFD847FAe6yVl6NWtk/p5+X8sQW5eU2NO0gHwbcCH4JtuEeS3Mi1IZ0BTM3oU4028c7+Vn9kkCvHQQvp8YnevjxIbZftv0xtK1iH7BgRqrAFTyh1A==>"\n\nif __name__ == "__main__":\n    app.run()\n```\n\nAdditional security recommendations:\n1. Make sure to manage your dependencies using a requirements.txt or Pipfile\n2. Regularly update your dependencies to get security patches\n3. Consider using a virtual environment for your project\n4. Use package security scanning tools like `safety` or `bandit` to check for known vulnerabilities in your dependencies',
          timestamp: "2024-12-09T17:50:20.846946Z",
          message_id: "91b84560-2d36-4aab-807a-c6f4612dd5fd",
        },
      },
    ],
    provider: "anthropic",
    type: "chat",
    chat_id: "chatcmpl-0f3c7eb8-4306-452b-a415-b2de8867e734",
    conversation_timestamp: "2024-12-09T17:50:04.418017Z",
  },
  alert_id: "fa53ba0d-4fb0-4770-a563-88e504af621f",
  code_snippet: null,
  trigger_string: {
    name: "invokehttp",
    type: "pypi",
    status: "malicious",
    description: "Python HTTP for Humans.",
  },
  trigger_type: "codegate-context-retriever",
  trigger_category: "critical",
  timestamp: "2024-12-09T17:50:04.418017Z",
};

function mockAlertsWithMaliciousPkg() {
  server.use(
    http.get("*/dashboard/alerts", () => {
      return HttpResponse.json([fakeConversionation1, fakeConversionation2]);
    }),
  );
}

function mockManyAlerts() {
  server.use(
    http.get("*/dashboard/alerts", () => {
      return HttpResponse.json(
        [
          ...mockedAlerts,
          ...mockedAlerts,
          ...mockedAlerts,
          ...mockedAlerts,
        ].map((alert) => ({ ...alert, alert_id: faker.string.uuid() })),
      );
    }),
  );
}

describe("Dashboard", () => {
  it("should render charts and table", async () => {
    render(<Dashboard />);
    expect(screen.getByText(/security issues detected/i)).toBeVisible();
    expect(screen.getByText(/malicious packages by type/i)).toBeVisible();
    expect(screen.getByText(/alerts by date/i)).toBeVisible();

    expect(
      screen.getByRole("heading", {
        name: /all alerts/i,
      }),
    ).toBeVisible();
    expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("0");
    expect(
      (await screen.findAllByTestId(/mock-responsive-container/i)).length,
    ).toEqual(1);
    await waitFor(() => expect(screen.getByText("Jan 02")).toBeVisible());
    await waitFor(() => expect(screen.getByText("Jan 03")).toBeVisible());
    await waitFor(() => expect(screen.getByText("Jan 07")).toBeVisible());

    expect(screen.getByTestId("codegate-secrets-count")).toHaveTextContent(
      "13",
    );

    expect(
      within(screen.getByTestId("malicious-piechart")).getByText("N/A"),
    ).toBeVisible();

    expect(
      screen.getByRole("columnheader", {
        name: /trigger type/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("columnheader", {
        name: /trigger token/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("columnheader", {
        name: /file/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("columnheader", {
        name: /code/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("columnheader", {
        name: /timestamp/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("switch", {
        name: /malicious packages/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole("searchbox")).toBeVisible();

    const firstRow = within(screen.getByTestId("alerts-table")).getAllByRole(
      "row",
    )[1] as HTMLElement;
    const secondRow = within(screen.getByTestId("alerts-table")).getAllByRole(
      "row",
    )[2] as HTMLElement;

    expect(within(firstRow).getByText(/ghp_token/i)).toBeVisible();
    expect(within(firstRow).getByText(/codegate-secrets/i)).toBeVisible();
    expect(within(firstRow).getAllByText(/n\/a/i).length).toEqual(2);
    expect(within(firstRow).getByText(/2025\/01\/14/i)).toBeVisible();
    expect(within(firstRow).getByTestId(/time/i)).toBeVisible();

    // check trigger_string null
    expect(within(secondRow).getAllByText(/n\/a/i).length).toEqual(3);
  });

  it("should render malicious pkg", async () => {
    mockAlertsWithMaliciousPkg();
    render(<Dashboard />);

    expect(
      (await screen.findAllByTestId(/mock-responsive-container/i)).length,
    ).toEqual(2);

    expect(
      within(screen.getByTestId("malicious-piechart")).getByText(/1/i),
    ).toBeVisible();

    expect(
      within(screen.getByTestId("security-issues-barchart")).getByText(
        /codegate-context-retriever/i,
      ),
    ).toBeVisible();

    expect(screen.getByText(/package:/i)).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /pypi\/invokehttp/i,
      }),
    ).toHaveAttribute(
      "href",
      "https://www.insight.stacklok.com/report/pypi/invokehttp",
    );
    expect(
      screen.getByText(/malicious python http for humans\./i),
    ).toBeVisible();
  });

  it("should filter by malicious pkg", async () => {
    mockAlertsWithMaliciousPkg();
    render(<Dashboard />);

    expect(
      (await screen.findAllByTestId(/mock-responsive-container/i)).length,
    ).toEqual(2);

    expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("2");
    expect(
      screen.getByRole("row", {
        name: /codegate-secrets/i,
      }),
    ).toBeVisible();

    userEvent.click(
      screen.getByRole("switch", {
        name: /malicious packages/i,
      }),
    );

    await waitFor(() =>
      expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("1"),
    );

    expect(screen.getByText(/package:/i)).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /pypi\/invokehttp/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/malicious python http for humans\./i),
    ).toBeVisible();

    userEvent.click(
      screen.getByRole("switch", {
        name: /malicious packages/i,
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("2"),
    );
  });

  it("should search by secrets alert", async () => {
    mockAlertsWithMaliciousPkg();
    render(<Dashboard />);

    expect(
      (await screen.findAllByTestId(/mock-responsive-container/i)).length,
    ).toEqual(2);

    expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("2");
    expect(
      screen.getByRole("row", {
        name: /codegate-secrets/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("row", {
        name: /codegate-context-retriever/i,
      }),
    ).toBeVisible();

    await userEvent.type(screen.getByRole("searchbox"), "codegate-secrets");

    waitFor(() =>
      expect(screen.getByTestId(/alerts-count/i)).toHaveTextContent("1"),
    );
    const row = within(screen.getByTestId("alerts-table")).getAllByRole(
      "row",
    )[1] as HTMLElement;
    expect(within(row).getByText(/ghp_token/i)).toBeVisible();
    expect(within(row).getByText(/codegate-secrets/i)).toBeVisible();
  });

  it("should sort alerts by date desc", async () => {
    render(<Dashboard />);
    expect(
      (await screen.findAllByTestId(/mock-responsive-container/i)).length,
    ).toEqual(1);

    const firstRow = within(screen.getByTestId("alerts-table")).getAllByRole(
      "row",
    )[1] as HTMLElement;
    const secondRow = within(screen.getByTestId("alerts-table")).getAllByRole(
      "row",
    )[2] as HTMLElement;

    expect(within(firstRow).getByText(/2025\/01\/14/i)).toBeVisible();
    expect(within(secondRow).getByText(/2025\/01\/07/i)).toBeVisible();
  });

  it("only displays a limited number of items in the table", async () => {
    mockManyAlerts();

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        within(screen.getByTestId("alerts-table")).getAllByRole("row"),
      ).toHaveLength(15);
    });
  });

  it("allows pagination", async () => {
    mockManyAlerts();

    render(<Dashboard />);

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();

    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();

    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();

    await userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();

    // back at the first page
    await userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });
});
