import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { expect } from "vitest";
import { CardCodegateStatus } from "../card-codegate-status";
import { render, waitFor } from "@/lib/test-utils";

const renderComponent = () => render(<CardCodegateStatus />);

describe("CardCodegateStatus", () => {
  test("renders 'healthy' state", async () => {
    server.use(
      http.get("*/health", () => HttpResponse.json({ status: "healthy" })),
    );

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/healthy/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'unhealthy' state", async () => {
    server.use(http.get("*/health", () => HttpResponse.json({ status: null })));

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/unhealthy/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'error' state", async () => {
    server.use(http.get("*/health", () => HttpResponse.error()));

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/an error occurred/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });
});
