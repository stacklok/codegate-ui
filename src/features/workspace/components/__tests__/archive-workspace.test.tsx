import { render } from "@/lib/test-utils";
import { ArchiveWorkspace } from "../archive-workspace";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

const mockNavigate = vi.fn();
const mockToast = vi.fn();
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

vi.mock("@stacklok/ui-kit", async () => {
  const original =
    await vi.importActual<typeof import("@stacklok/ui-kit")>(
      "@stacklok/ui-kit",
    );
  return {
    ...original,
    toast: { error: () => mockToast },
  };
});

test("archive workspace", async () => {
  render(<ArchiveWorkspace isArchived={false} workspaceName="foo" />);

  await userEvent.click(screen.getByRole("button", { name: /archive/i }));
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("/workspaces");
});
