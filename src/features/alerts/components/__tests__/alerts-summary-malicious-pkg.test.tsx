import { server } from "@/mocks/msw/node";
import { test } from "vitest";
import { http, HttpResponse } from "msw";
import { render, waitFor } from "@/lib/test-utils";
import { AlertsSummaryMaliciousPkg } from "../alerts-summary-malicious-pkg";
import { makeMockAlert } from "../../mocks/alert.mock";

test("shows correct count when there is a malicious alert", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/alerts", () => {
      return HttpResponse.json([makeMockAlert({ type: "malicious" })]);
    }),
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />);

  await waitFor(() => {
    expect(getByTestId("malicious-count")).toHaveTextContent("1");
  });
});

test("shows correct count when there is no malicious alert", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/alerts", () => {
      return HttpResponse.json([makeMockAlert({ type: "secret" })]);
    }),
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousPkg />);

  await waitFor(() => {
    expect(getByTestId("malicious-count")).toHaveTextContent("0");
  });
});
