import { render } from "@/lib/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { WorkspacePreferredModel } from "../workspace-preferred-model";
import userEvent from "@testing-library/user-event";

test("render model overrides", async () => {
  render(
    <WorkspacePreferredModel
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );
  expect(screen.getByText(/preferred model/i)).toBeVisible();
  expect(
    screen.getByText(
      /select the model you would like to use in this workspace./i,
    ),
  ).toBeVisible();
  expect(
    screen.getByRole("button", { name: /select the model/i }),
  ).toBeVisible();

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /save/i })).toBeVisible();
  });
});

test("submit preferred model", async () => {
  render(
    <WorkspacePreferredModel
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );

  await userEvent.click(
    screen.getByRole("button", { name: /select the model/i }),
  );

  await userEvent.click(
    screen.getByRole("option", {
      name: "anthropic/claude-3.5",
    }),
  );

  await userEvent.click(screen.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(screen.getByText(/preferred model for fake-workspace updated/i));
  });

  expect(screen.queryByText(/revert changes/i)).not.toBeInTheDocument();
});
