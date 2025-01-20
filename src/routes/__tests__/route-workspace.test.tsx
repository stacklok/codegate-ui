import { render } from "@/lib/test-utils";
import { test, expect } from "vitest";
import { RouteWorkspace } from "../route-workspace";

const renderComponent = () => render(<RouteWorkspace />);

vi.mock("@monaco-editor/react", () => {
  const FakeEditor = vi.fn((props) => {
    return (
      <textarea
        data-testid="system-prompt-editor"
        data-auto={props.wrapperClassName}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      ></textarea>
    );
  });
  return { default: FakeEditor };
});

test("renders title", () => {
  const { getByRole } = renderComponent();

  expect(
    getByRole("heading", { name: "Workspace settings", level: 1 }),
  ).toBeVisible();
});

test("renders workspace name input", () => {
  const { getByRole } = renderComponent();

  expect(getByRole("textbox", { name: "Workspace name" })).toBeVisible();
});

test("renders system prompt editor", () => {
  const { getByTestId } = renderComponent();

  expect(getByTestId("system-prompt-editor")).toBeVisible();
});
