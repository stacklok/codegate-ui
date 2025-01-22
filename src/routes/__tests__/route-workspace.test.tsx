import { render, waitFor, within } from "@/lib/test-utils";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { RouteWorkspace } from "../route-workspace";

const mockNavigate = vi.fn();

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
        value={props.value ?? ""}
      ></textarea>
    );
  });
  return { default: FakeEditor };
});

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

test("renders title", () => {
  const { getByRole } = renderComponent();

  expect(
    getByRole("heading", { name: "Workspace settings", level: 4 }),
  ).toBeVisible();
});

test("renders workspace name input", () => {
  const { getByRole } = renderComponent();

  expect(getByRole("textbox", { name: /workspace name/i })).toBeVisible();
});

test("renders system prompt editor", async () => {
  const { getByTestId } = renderComponent();

  await waitFor(() => {
    expect(getByTestId("system-prompt-editor")).toBeVisible();
  });
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

test("rename workspace", async () => {
  const { getByRole, getByTestId } = renderComponent();

  const workspaceName = getByRole("textbox", {
    name: /workspace name/i,
  });
  await userEvent.type(workspaceName, "_renamed");

  const saveBtn = within(getByTestId("workspace-name")).getByRole("button", {
    name: /save/i,
  });
  await userEvent.click(saveBtn);
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("/workspace/foo_renamed");
});
