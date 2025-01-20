import { render, waitFor } from "@/lib/test-utils";
import { expect, test } from "vitest";
import { SystemPromptEditor } from "../system-prompt-editor";
import userEvent from "@testing-library/user-event";
import * as POST_MODULE from "../../lib/post-system-prompt";

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

const renderComponent = () => render(<SystemPromptEditor />);

test("can update system prompt", async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const POST_PROMPT_MOCK = vi.fn(async (_) => Promise.resolve());

  vi.mocked(POST_MODULE).postSystemPrompt = POST_PROMPT_MOCK;

  const { getByRole } = renderComponent();

  const input = getByRole("textbox");
  expect(input).toBeVisible();

  await userEvent.clear(input);
  await userEvent.type(input, "foo bar 123");
  expect(input).toHaveTextContent("foo bar 123");

  await userEvent.click(getByRole("button", { name: /save changes/i }));
  await waitFor(() => {
    expect(POST_PROMPT_MOCK).toBeCalledWith("foo bar 123");
  });
});
