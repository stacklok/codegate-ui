import { render } from "@/lib/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import React from "react";
import userEvent from "@testing-library/user-event";

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

    await userEvent.click(screen.getByText("Certificates"));

    expect(
      screen.getByRole("menuitem", {
        name: /certificate security/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("menuitem", {
        name: /download/i,
      }),
    ).toBeVisible();

    await userEvent.click(screen.getByText("Certificates"));
    await userEvent.click(screen.getByText("Setup"));

    expect(
      screen.getByRole("menuitem", {
        name: /set up in continue/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("menuitem", {
        name: /set up in copilot/i,
      }),
    ).toBeVisible();

    await userEvent.click(screen.getByText("Setup"));

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

  it("should render workspaces dropdown", async () => {
    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: "CodeGate Dashboard" }),
      ).toBeVisible(),
    );

    const workspaceSelectionButton = screen.getByRole("button", {
      name: "Workspace default",
    });
    await waitFor(() => expect(workspaceSelectionButton).toBeVisible());

    await userEvent.click(workspaceSelectionButton);

    await waitFor(() =>
      expect(
        screen.getByRole("option", {
          name: /anotherworkspae/i,
        }),
      ).toBeVisible(),
    );
  });
});
