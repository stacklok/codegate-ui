import {} from "vitest";
import { TableAlerts } from "../table-alerts";
import { render, screen, waitFor, within } from "@/lib/test-utils";
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
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
  });

  await waitFor(() => {
    expect(queryByText(/loading alerts/i)).not.toBeInTheDocument();
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
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
  });

  await waitFor(() => {
    expect(queryByText(/loading alerts/i)).not.toBeInTheDocument();
  });

  expect(getByText("N/A")).toBeVisible();
});

test("renders empty state when the API returns no alerts - user has not created multipe workspaces", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([]);
    }),
    http.get("*/workspaces", () => {
      return HttpResponse.json({
        workspaces: [
          {
            name: "my-awesome-workspace",
            is_active: true,
            last_updated: new Date(Date.now()).toISOString(),
          },
        ],
      });
    }),
  );

  const { getByText, queryByText, getByRole } = render(<TableAlerts />);

  await waitFor(() => {
    expect(queryByText(/loading alerts/i)).not.toBeInTheDocument();
  });

  expect(getByText("Connect CodeGate to your IDE")).toBeVisible();
  expect(getByText(/learn how to get set up using/i)).toBeVisible();

  expect(getByRole("link", { name: /continue/i })).toHaveAttribute(
    "href",
    "https://docs.codegate.ai/quickstart-continue",
  );
  expect(getByRole("link", { name: /continue/i })).toHaveAttribute(
    "target",
    "_blank",
  );
  expect(getByRole("link", { name: /copilot/i })).toHaveAttribute(
    "href",
    "https://docs.codegate.ai/quickstart",
  );
  expect(getByRole("link", { name: /copilot/i })).toHaveAttribute(
    "target",
    "_blank",
  );
  expect(getByRole("link", { name: /aider/i })).toHaveAttribute(
    "href",
    "https://docs.codegate.ai/how-to/use-with-aider",
  );
  expect(getByRole("link", { name: /aider/i })).toHaveAttribute(
    "target",
    "_blank",
  );

  expect(
    getByRole("link", { name: /codegate documentation/i }),
  ).toHaveAttribute("href", "https://docs.codegate.ai/");
  expect(
    getByRole("link", { name: /codegate documentation/i }),
  ).toHaveAttribute("target", "_blank");
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

test("renders empty state when the API returns no alerts - user has multiple workspaces", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([]);
    }),
  );

  const { getByText, queryByText, getByRole } = render(<TableAlerts />);

  await waitFor(() => {
    expect(queryByText(/loading alerts/i)).not.toBeInTheDocument();
  });

  expect(getByText(/no alerts found/i)).toBeVisible();
  expect(
    getByText(
      /alerts will show up here when you use this workspace in your IDE/i,
    ),
  ).toBeVisible();

  expect(
    getByRole("link", { name: /learn about workspaces/i }),
  ).toHaveAttribute("href", "https://docs.codegate.ai/features/workspaces");
  expect(
    getByRole("link", { name: /learn about workspaces/i }),
  ).toHaveAttribute("target", "_blank");
});
