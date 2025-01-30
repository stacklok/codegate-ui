import { server } from "@/mocks/msw/node";
import { test } from "vitest";
import { http, HttpResponse } from "msw";
import { render, waitFor } from "@/lib/test-utils";

import { AlertsSummaryWorkspaceTokenUsage } from "../alerts-summary-workspace-token-usage";
import { TOKEN_USAGE_AGG } from "../../mocks/token-usage.mock";

test("shows correct count when there is token usage", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/token-usage", () => {
      return HttpResponse.json(TOKEN_USAGE_AGG);
    }),
  );

  const { getByTestId } = render(<AlertsSummaryWorkspaceTokenUsage />);

  await waitFor(() => {
    expect(getByTestId("usage-input-tokens")).toHaveTextContent(
      TOKEN_USAGE_AGG.token_usage.input_tokens.toString(),
    );
    expect(getByTestId("usage-output-tokens")).toHaveTextContent(
      TOKEN_USAGE_AGG.token_usage.output_tokens.toString(),
    );
  });
});

test("shows correct count when there is no token usage", async () => {
  server.use(
    http.get("*/api/v1/workspaces/:name/token-usage", () => {
      return HttpResponse.json({});
    }),
  );

  const { getByTestId } = render(<AlertsSummaryWorkspaceTokenUsage />);

  await waitFor(() => {
    expect(getByTestId("usage-input-tokens")).toHaveTextContent("0");
    expect(getByTestId("usage-output-tokens")).toHaveTextContent("0");
  });
});
