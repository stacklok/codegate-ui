import { render } from "@/lib/test-utils";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteHelp } from "../route-help";

describe("Help page", () => {
  it("has breadcrumbs", () => {
    render(<RouteHelp />, {
      routeConfig: {
        initialEntries: ["/help/continue-setup"],
      },
      pathConfig: "/help/:id",
    });
    const breadcrumbs = screen.getByRole("list", { name: "Breadcrumbs" });
    expect(breadcrumbs).toBeVisible();
    expect(
      within(breadcrumbs).getByRole("link", { name: "Dashboard" }),
    ).toHaveAttribute("href", "/");
    expect(within(breadcrumbs).getByText(/help/i)).toBeVisible();
  });
});
