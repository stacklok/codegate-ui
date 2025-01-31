import {} from "vitest";
import { TableAlerts } from "../table-alerts";
import { render, waitFor } from "@/lib/test-utils";
import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { makeMockAlert } from "../../mocks/alert.mock";
import { TOKEN_USAGE_AGG } from "../../mocks/token-usage.mock";
import { formatNumberCompact } from "@/lib/format-number";

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
  TOKEN_USAGE_AGG.tokens_by_model["claude-3-5-sonnet-latest"].token_usage
    .input_tokens;

const OUTPUT_TOKENS =
  TOKEN_USAGE_AGG.tokens_by_model["claude-3-5-sonnet-latest"].token_usage
    .output_tokens;

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
    expect(queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  expect(getByTestId("icon-arrow-up")).toBeVisible();
  expect(getByTestId("icon-arrow-down")).toBeVisible();

  expect(
    getByRole("gridcell", {
      name: `${formatNumberCompact(INPUT_TOKENS)} ${formatNumberCompact(OUTPUT_TOKENS)}`,
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
    expect(queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  expect(getByText("N/A")).toBeVisible();
});
