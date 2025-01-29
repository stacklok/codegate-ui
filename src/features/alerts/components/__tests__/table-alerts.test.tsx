import {} from "vitest";
import { TableAlerts } from "../table-alerts";
import { render, screen, waitFor, within } from "@/lib/test-utils";
import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import {
  AlertConversation,
  ProviderType,
  QuestionType,
  TokenUsageAggregate,
} from "@/api/generated";

vi.mock("@untitled-ui/icons-react", async () => {
  const original = await vi.importActual<
    typeof import("@untitled-ui/icons-react")
  >("@untitled-ui/icons-react");
  return {
    ...original,
    ArrowDown: () => <div data-testid="icon-arrow-down" />,
    ArrowUp: () => <div data-testid="icon-arrow-up" />,
  };
});

const TOKEN_USAGE_AGG = {
  tokens_by_model: {
    "claude-3-5-sonnet-latest": {
      provider_type: ProviderType.ANTHROPIC,
      model: "claude-3-5-sonnet-latest",
      token_usage: {
        input_tokens: 1183,
        output_tokens: 433,
        input_cost: 0.003549,
        output_cost: 0.006495,
      },
    },
  },
  token_usage: {
    input_tokens: 1183,
    output_tokens: 433,
    input_cost: 0.003549,
    output_cost: 0.006495,
  },
} as const satisfies TokenUsageAggregate;

const makeMockAlert = ({
  token_usage_agg,
}: {
  token_usage_agg: TokenUsageAggregate | null;
}) => {
  return {
    conversation: {
      question_answers: [
        {
          question: {
            message: "foo",
            timestamp: "2025-01-28T14:32:57.836445Z",
            message_id: "cfdf1acd-999c-430b-bb57-4c4db6cec6c9",
          },
          answer: {
            message: "bar",
            timestamp: "2025-01-28T14:32:59.107793Z",
            message_id: "c2b88968-06b3-485d-a42b-7b54f973eef9",
          },
        },
      ],
      provider: "anthropic",
      type: QuestionType.CHAT,
      chat_id: "cfdf1acd-999c-430b-bb57-4c4db6cec6c9",
      conversation_timestamp: "2025-01-28T14:32:57.836445Z",
      token_usage_agg,
    },
    alert_id: "2379b08b-1e2b-4d6b-b425-e58a0b4fe7bc",
    code_snippet: null,
    trigger_string: "foo",
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-01-28T14:32:57.599032Z",
  } as const satisfies AlertConversation;
};

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
        makeMockAlert({ token_usage_agg: TOKEN_USAGE_AGG }),
      ]);
    }),
  );

  const { getByRole, getByTestId } = render(<TableAlerts />);

  await waitFor(() => {
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
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
      return HttpResponse.json([makeMockAlert({ token_usage_agg: null })]);
    }),
  );

  const { getByText } = render(<TableAlerts />);

  await waitFor(() => {
    expect(
      within(screen.getByTestId("alerts-table")).getAllByRole("row"),
    ).toHaveLength(2);
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
      return HttpResponse.json([makeMockAlert({ token_usage_agg: null })]);
    }),
  );

  const { findAllByText } = render(<TableAlerts />);

  expect((await findAllByText("Connect CodeGate to your IDE")).length).toEqual(
    0,
  );
});
