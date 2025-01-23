import { render } from "@/lib/test-utils";
import { ArchiveWorkspace } from "../archive-workspace";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

test("archive workspace", async () => {
  render(<ArchiveWorkspace isArchived={false} workspaceName="foo" />);

  await userEvent.click(screen.getByRole("button", { name: /archive/i }));

  await waitFor(() => {
    expect(screen.getByText(/archived "(.*)" workspace/i)).toBeVisible();
  });
});
