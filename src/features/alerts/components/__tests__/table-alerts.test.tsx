import {} from "vitest";
import { TableAlerts } from "../table-alerts";
import { render, screen, waitFor, within } from "@/lib/test-utils";
import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { makeMockAlert } from "../../mocks/alert.mock";
import { TOKEN_USAGE_AGG } from "../../mocks/token-usage.mock";

vi.mock("@untitled-ui/icons-react", async () => {
  const original = await vi.importActual<
    typeof import("@untitled-ui/icons-react")
  >("@untitled-ui/icons-react");
  return {
    ...original,
    Download01: () => <div data-testid="icon-arrow-down" />,
    Upload01: () => <div data-testid="icon-arrow-up" />,
  };
});

const INPUT_TOKENS =
  TOKEN_USAGE_AGG.tokens_by_model[
    "claude-3-5-sonnet-latest"
  ].token_usage.input_tokens.toString();

const OUTPUT_TOKENS =
  TOKEN_USAGE_AGG.tokens_by_model[
    "claude-3-5-sonnet-latest"
  ].token_usage.output_tokens.toString();

test("renders token usage cell correctly", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([
        makeMockAlert({ token_usage: true, type: "malicious" }),
      ]);
    }),
  );

  const { getByRole, getByTestId, queryByText } = render(<TableAlerts />);

  await waitFor(() => {
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
  });

  await waitFor(() => {
    expect(queryByText("Connect CodeGate to your IDE")).not.toBeInTheDocument();
  });

  expect(getByTestId("icon-arrow-up")).toBeVisible();
  expect(getByTestId("icon-arrow-down")).toBeVisible();

  expect(
    getByRole("gridcell", {
      name: `${INPUT_TOKENS} ${OUTPUT_TOKENS}`,
    }),
  ).toBeVisible();
});

test("renders N/A when token usage is missing", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([
        makeMockAlert({ token_usage: false, type: "malicious" }),
      ]);
    }),
  );

  const { getByText, queryByText } = render(<TableAlerts />);

  await waitFor(() => {
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
  });

  await waitFor(() => {
    expect(queryByText("Connect CodeGate to your IDE")).not.toBeInTheDocument();
  });

  expect(getByText("N/A")).toBeVisible();
});

test("renders empty state when the API returns no alerts", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([]);
    }),
  );

  const { getByText } = render(<TableAlerts />);

  expect(getByText("Connect CodeGate to your IDE")).toBeVisible();
});

test("does not render table empty state when the API responds with alerts", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([
        makeMockAlert({ token_usage: false, type: "malicious" }),
      ]);
    }),
  );

  const { queryByText } = render(<TableAlerts />);

  await waitFor(() => {
    expect(queryByText("Connect CodeGate to your IDE")).not.toBeInTheDocument();
  });
});
