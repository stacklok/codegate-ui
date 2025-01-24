import { render, waitFor } from "@/lib/test-utils";
import { expect, test } from "vitest";

import userEvent from "@testing-library/user-event";
import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { SystemPromptEditor } from "../system-prompt-editor";

vi.mock("../../lib/post-system-prompt");

vi.mock("@monaco-editor/react", () => {
  const FakeEditor = vi.fn((props) => {
    return (
      <textarea
        data-auto={props.wrapperClassName}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      ></textarea>
    );
  });
  return { default: FakeEditor };
});

const renderComponent = () =>
  render(<SystemPromptEditor isArchived={false} workspaceName="foo" />);

test("can update system prompt", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/custom-instructions", () => {
      return HttpResponse.json({ prompt: "initial prompt from server" });
    }),
  );

  const { getByRole } = renderComponent();

  await waitFor(() => {
    expect(getByRole("textbox")).toBeVisible();
  });

  const input = getByRole("textbox");
  expect(input).toHaveTextContent("initial prompt from server");

  await userEvent.clear(input);
  await userEvent.type(input, "new prompt from test");
  expect(input).toHaveTextContent("new prompt from test");

  await userEvent.click(getByRole("button", { name: /Save/i }));

  server.use(
    http.get("*/api/v1/workspaces/:name/custom-instructions", () => {
      return HttpResponse.json({ prompt: "new prompt from test" });
    }),
  );

  await waitFor(() => {
    expect(input).toHaveTextContent("new prompt from test");
  });
});
