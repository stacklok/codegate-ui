import { render } from "@/lib/test-utils";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteCertificateSecurity } from "../route-certificate-security";

describe("Certificate security", () => {
  it("has breadcrumbs", () => {
    render(<RouteCertificateSecurity />);

    const breadcrumbs = screen.getByRole("list", { name: "Breadcrumbs" });
    expect(breadcrumbs).toBeVisible();
    expect(
      within(breadcrumbs).getByRole("link", { name: "Dashboard" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(breadcrumbs).getByText(/certificate security/i),
    ).toBeVisible();
  });
});
