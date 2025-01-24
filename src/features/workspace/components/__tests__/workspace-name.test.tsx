import { test, expect } from "vitest";
import { WorkspaceName } from "../workspace-name";
import { render, waitFor } from "@/lib/test-utils";
import userEvent from "@testing-library/user-event";

test("can rename workspace", async () => {
  const { getByRole, getByText } = render(
    <WorkspaceName workspaceName="foo-bar" isArchived={false} />,
  );

  const input = getByRole("textbox", { name: /workspace name/i });
  await userEvent.clear(input);

  await userEvent.type(input, "baz-qux");
  expect(input).toHaveValue("baz-qux");

  await userEvent.click(getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(getByText(/renamed workspace to "baz-qux"/i)).toBeVisible();
  });
});

test("can't rename archived workspace", async () => {
  const { getByRole } = render(
    <WorkspaceName workspaceName="foo" isArchived={true} />,
  );

  expect(getByRole("textbox", { name: /workspace name/i })).toBeDisabled();
  expect(getByRole("button", { name: /save/i })).toBeDisabled();
});
