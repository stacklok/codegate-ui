import { server } from "@/mocks/msw/node";
import { test } from "vitest";
import { http, HttpResponse } from "msw";
import { render, waitFor } from "@/lib/test-utils";

import { AlertsSummaryMaliciousSecrets } from "../alerts-summary-secrets";
import { makeMockAlert } from "../../mocks/alert.mock";

test("shows correct count when there is a secret alert", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/alerts", () => {
      return HttpResponse.json([makeMockAlert({ type: "secret" })]);
    }),
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />);

  await waitFor(() => {
    expect(getByTestId("secrets-count")).toHaveTextContent("1");
  });
});

test("shows correct count when there is no malicious alert", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/alerts", () => {
      return HttpResponse.json([makeMockAlert({ type: "malicious" })]);
    }),
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />);

  await waitFor(() => {
    expect(getByTestId("secrets-count")).toHaveTextContent("0");
  });
});
