import { render } from "@/lib/test-utils";
import { ArchiveWorkspace } from "../archive-workspace";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

test("has correct buttons when not archived", async () => {
  const { getByRole } = render(
    <ArchiveWorkspace isArchived={false} workspaceName="foo-bar" />,
  );

  expect(getByRole("button", { name: /archive/i })).toBeVisible();
});

test("has correct buttons when archived", async () => {
  const { getByRole } = render(
    <ArchiveWorkspace isArchived={true} workspaceName="foo-bar" />,
  );
  expect(getByRole("button", { name: /restore/i })).toBeVisible();
  expect(getByRole("button", { name: /permanently delete/i })).toBeVisible();
});

test("can archive workspace", async () => {
  const { getByText, getByRole } = render(
    <ArchiveWorkspace isArchived={false} workspaceName="foo-bar" />,
  );

  await userEvent.click(getByRole("button", { name: /archive/i }));

  await waitFor(() => {
    expect(getByText(/archived "foo-bar" workspace/i)).toBeVisible();
  });
});

test("can restore archived workspace", async () => {
  const { getByText, getByRole } = render(
    <ArchiveWorkspace isArchived={true} workspaceName="foo-bar" />,
  );

  await userEvent.click(getByRole("button", { name: /restore/i }));

  await waitFor(() => {
    expect(getByText(/restored "foo-bar" workspace/i)).toBeVisible();
  });
});

test("can permanently delete archived workspace", async () => {
  const { getByText, getByRole } = render(
    <ArchiveWorkspace isArchived={true} workspaceName="foo-bar" />,
  );

  await userEvent.click(getByRole("button", { name: /permanently delete/i }));

  await waitFor(() => {
    expect(getByRole("dialog", { name: /permanently delete/i })).toBeVisible();
  });

  await userEvent.click(getByRole("button", { name: /delete/i }));

  await waitFor(() => {
    expect(getByText(/permanently deleted "foo-bar" workspace/i)).toBeVisible();
  });
});
