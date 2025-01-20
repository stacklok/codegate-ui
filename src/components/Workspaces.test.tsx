import { render } from "@/lib/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Workspaces } from "./Workspaces";

describe("Workspaces page", () => {
  beforeEach(() => {
    render(<Workspaces />);
  });

  it("has a title", () => {
    expect(
      screen.getByRole("heading", { name: /manage workspaces/i }),
    ).toBeVisible();
  });

  it("has a table with the correct columns", () => {
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeVisible();
    expect(
      screen.getByRole("columnheader", { name: /configuration/i }),
    ).toBeVisible();
  });

  it("has a row for each workspace", async () => {
    await waitFor(() => {
      expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
    });

    expect(
      screen.getByRole("rowheader", { name: /myworkspace/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("rowheader", { name: /anotherworkspae/i }),
    ).toBeVisible();
  });
});
