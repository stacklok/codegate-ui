import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { expect } from "vitest";
import { CodegateStatus } from "../codegate-status";
import { render, waitFor } from "@/lib/test-utils";

const renderComponent = () => render(<CodegateStatus />);

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

  test("renders 'error' state when health check request fails", async () => {
    server.use(http.get("*/health", () => HttpResponse.error()));

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/an error occurred/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'error' state when version check request fails", async () => {
    server.use(http.get("*/dashboard/version", () => HttpResponse.error()));

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/an error occurred/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'latest version' state", async () => {
    server.use(
      http.get("*/dashboard/version", () =>
        HttpResponse.json({
          current_version: "foo",
          latest_version: "foo",
          is_latest: true,
          error: null,
        }),
      ),
    );

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/latest/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'update available' state", async () => {
    server.use(
      http.get("*/dashboard/version", () =>
        HttpResponse.json({
          current_version: "foo",
          latest_version: "bar",
          is_latest: false,
          error: null,
        }),
      ),
    );

    const { getByRole } = renderComponent();

    await waitFor(
      () => {
        const role = getByRole("link", { name: /update available/i });
        expect(role).toBeVisible();
        expect(role).toHaveAttribute(
          "href",
          "https://docs.codegate.ai/how-to/install#upgrade-codegate",
        );
      },
      { timeout: 10_000 },
    );
  });

  test("renders 'version check error' state", async () => {
    server.use(
      http.get("*/dashboard/version", () =>
        HttpResponse.json({
          current_version: "foo",
          latest_version: "bar",
          is_latest: false,
          error: "foo",
        }),
      ),
    );

    const { getByText } = renderComponent();

    await waitFor(
      () => {
        expect(getByText(/error checking version/i)).toBeVisible();
      },
      { timeout: 10_000 },
    );
  });
});
