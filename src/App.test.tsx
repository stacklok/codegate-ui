import { render } from "@/lib/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import React from "react";

vi.mock("recharts", async (importOriginal) => {
  const originalModule = (await importOriginal()) as Record<string, unknown>;
  return {
    ...originalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => {
      return <div data-testid="mock-responsive-container">{children}</div>;
    },
  };
});

describe("App", () => {
  it("should render header", async () => {
    render(<App />);
    expect(screen.getByText(/toggle sidebar/i)).toBeVisible();
    expect(screen.getByText("Certificates")).toBeVisible();
    expect(screen.getByText("Setup")).toBeVisible();
    expect(screen.getByRole("banner", { name: "App header" })).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /codeGate dashboard/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /certificate security/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /set up in continue/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("link", {
        name: /set up in copilot/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /download/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /documentation/i,
      }),
    ).toBeVisible();
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /codeGate dashboard/i }),
      ).toBeVisible(),
    );
  });

  it("should render breadcrumb", async () => {
    render(<App />);
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /codeGate dashboard/i }),
      ).toBeVisible(),
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeVisible();
  });
});
