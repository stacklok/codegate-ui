import { render } from "@/lib/test-utils";
import { screen } from "@testing-library/react";
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

  it("has a row for each workspace", () => {
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
});
