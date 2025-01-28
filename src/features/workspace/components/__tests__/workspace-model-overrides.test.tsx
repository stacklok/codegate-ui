import { render } from "@/lib/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { WorkspaceModelOverrides } from "../workspace-model-overrides";
import userEvent from "@testing-library/user-event";

test("render model overrides", () => {
  render(
    <WorkspaceModelOverrides
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );
  expect(screen.getByText(/model overrides/i)).toBeVisible();
  expect(
    screen.getByText(
      /route to different large language models based on file type, individual files, or repository./i,
    ),
  ).toBeVisible();
  expect(
    screen.getAllByRole("textbox", { name: /filter by/i }).length,
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.getAllByRole("button", { name: /preferred model/i }).length,
  ).toBeGreaterThanOrEqual(1);

  expect(
    screen.getAllByPlaceholderText(/eg file type, file name, or repository/i)
      .length,
  ).toBeGreaterThanOrEqual(1);
});

test("submit model overrides", async () => {
  render(
    <WorkspaceModelOverrides
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );

  const filterByEl = screen.getAllByRole("textbox", { name: /filter by/i })[0];
  await userEvent.type(filterByEl as HTMLFormElement, "*.tsx");

  const modelEl = screen.getAllByRole("button", {
    name: /preferred model/i,
  })[0];
  await userEvent.click(modelEl as HTMLFormElement);

  await userEvent.click(
    screen.getByRole("option", {
      name: "claude-3.5",
    }),
  );

  await userEvent.click(screen.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        /model overrides on fake-workspace successfully submitted!/i,
      ),
    );
  });
});

test("submit additional model overrides", async () => {
  render(
    <WorkspaceModelOverrides
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );

  expect(screen.getAllByRole("textbox", { name: /filter by/i }).length).toEqual(
    2,
  );

  await userEvent.click(
    screen.getByRole("button", { name: /additional filter/i }),
  );

  const textFields = await screen.findAllByRole("textbox", {
    name: /filter by/i,
  });
  expect(textFields.length).toEqual(3);
  expect(textFields[2]).toBeDefined();
  await userEvent.type(textFields[2] as HTMLFormElement, "*.ts");

  await userEvent.click(
    screen.getAllByRole("button", {
      name: /preferred model/i,
    })[2] as HTMLFormElement,
  );

  await userEvent.click(
    screen.getByRole("option", {
      name: "claude-3.5",
    }),
  );

  await userEvent.click(screen.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        /model overrides on fake-workspace successfully submitted!/i,
      ),
    );
  });
});

test("remove the first model override and submit", async () => {
  render(
    <WorkspaceModelOverrides
      isArchived={false}
      workspaceName="fake-workspace"
    />,
  );

  const textFields = screen.getAllByRole("textbox", { name: /filter by/i });
  expect(textFields.length).toEqual(3);
  await userEvent.click(
    screen.getAllByRole("button", {
      name: /remove override/i,
    })[0] as HTMLFormElement,
  );

  await waitFor(() =>
    expect(
      screen.getAllByRole("textbox", { name: /filter by/i }).length,
    ).toEqual(2),
  );

  await userEvent.click(screen.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        /model overrides on fake-workspace successfully submitted!/i,
      ),
    );
  });
});
