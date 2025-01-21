import { render, within } from "@/lib/test-utils";
import { test, expect } from "vitest";
import { RouteWorkspace } from "../route-workspace";

const renderComponent = () =>
  render(<RouteWorkspace />, {
    routeConfig: {
      initialEntries: ["/workspace/foo"],
    },
    pathConfig: "/workspace/:name",
  });

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
    getByRole("heading", { name: "Workspace settings", level: 4 }),
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

test("has breadcrumbs", () => {
  const { getByRole } = renderComponent();

  const breadcrumbs = getByRole("list", { name: "Breadcrumbs" });
  expect(breadcrumbs).toBeVisible();
  expect(
    within(breadcrumbs).getByRole("link", { name: "Dashboard" }),
  ).toHaveAttribute("href", "/");
  expect(
    within(breadcrumbs).getByRole("link", { name: /manage workspaces/i }),
  ).toHaveAttribute("href", "/workspaces");
  expect(within(breadcrumbs).getByText(/workspace settings/i)).toBeVisible();
});
