import { render } from "@/lib/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "../ErrorBoundary";
import { Error } from "../Error";

const ErrorComponent = () => {
  throw Error();
};

describe("ErrorBoundary", () => {
  it("renders fallback when a child throws an error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<Error />}>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/an error occurred/i)).toBeVisible();
  });
});
