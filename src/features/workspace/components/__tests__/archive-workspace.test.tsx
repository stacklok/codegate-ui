import { render } from "@/lib/test-utils";
import { ArchiveWorkspace } from "../archive-workspace";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { mswEndpoint } from "@/test/msw-endpoint";

test("has correct buttons when not archived", async () => {
  const { getByRole, queryByRole } = render(
    <ArchiveWorkspace isArchived={false} workspaceName="foo-bar" />,
  );

  expect(getByRole("button", { name: /archive/i })).toBeVisible();
  expect(queryByRole("button", { name: /contextual help/i })).toBe(null);
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

test("can't archive active workspace", async () => {
  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/active"), () =>
      HttpResponse.json({
        workspaces: [
          {
            name: "foo",
            is_active: true,
            last_updated: new Date(Date.now()).toISOString(),
          },
        ],
      }),
    ),
  );
  const { getByRole } = render(
    <ArchiveWorkspace workspaceName="foo" isArchived={false} />,
  );

  await waitFor(() => {
    expect(getByRole("button", { name: /archive/i })).toBeDisabled();
    expect(getByRole("button", { name: /contextual help/i })).toBeVisible();
  });
});

test("can't archive default workspace", async () => {
  const { getByRole } = render(
    <ArchiveWorkspace workspaceName="default" isArchived={false} />,
  );

  await waitFor(() => {
    expect(getByRole("button", { name: /archive/i })).toBeDisabled();
    expect(getByRole("button", { name: /contextual help/i })).toBeVisible();
  });
});
