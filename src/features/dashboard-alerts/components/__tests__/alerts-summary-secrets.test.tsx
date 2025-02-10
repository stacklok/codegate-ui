import { server } from "@/mocks/msw/node";
import { test } from "vitest";
import { http, HttpResponse } from "msw";
import { render, waitFor } from "@/lib/test-utils";

import { AlertsSummaryMaliciousSecrets } from "../alerts-summary-secrets";
import { mockAlert } from "../../../../mocks/msw/mockers/alert.mock";
import { mswEndpoint } from "@/test/msw-endpoint";

test("shows correct count when there is a secret alert", async () => {
  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/alerts"), () => {
      return HttpResponse.json([mockAlert({ type: "secret" })]);
    })
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />);

  await waitFor(() => {
    expect(getByTestId("secrets-count")).toHaveTextContent("1");
  });
});

test("shows correct count when there is no malicious alert", async () => {
  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/alerts"), () => {
      return HttpResponse.json([mockAlert({ type: "malicious" })]);
    })
  );

  const { getByTestId } = render(<AlertsSummaryMaliciousSecrets />);

  await waitFor(() => {
    expect(getByTestId("secrets-count")).toHaveTextContent("0");
  });
});
