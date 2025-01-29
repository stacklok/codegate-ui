import {
  AlertConversation,
  QuestionType,
  TokenUsageAggregate,
} from "@/api/generated";
import { faker } from "@faker-js/faker";
import { TOKEN_USAGE_AGG } from "./token-usage.mock";

export const ALERT_SECRET_FIELDS = {
  trigger_string: "foo",
  trigger_type: "codegate-secrets",
} satisfies Pick<AlertConversation, "trigger_string" | "trigger_type">;

export const ALERT_MALICIOUS_FIELDS = {
  trigger_string: {
    name: "invokehttp",
    type: "pypi",
    status: "malicious",
    description: "Python HTTP for Humans.",
  },
  trigger_type: "codegate-context-retriever",
} satisfies Pick<AlertConversation, "trigger_string" | "trigger_type">;

const getBaseAlert = ({
  timestamp,
  token_usage_agg,
}: {
  timestamp: string;
  token_usage_agg: TokenUsageAggregate | null;
}): Omit<AlertConversation, "trigger_type" | "trigger_string"> => ({
  conversation: {
    question_answers: [
      {
        question: {
          message: "foo",
          timestamp: timestamp,
          message_id: faker.string.uuid(),
        },
        answer: {
          message: "bar",
          timestamp: timestamp,
          message_id: faker.string.uuid(),
        },
      },
    ],
    provider: "anthropic",
    type: QuestionType.CHAT,
    chat_id: faker.string.uuid(),
    conversation_timestamp: timestamp,
    token_usage_agg,
  },
  alert_id: faker.string.uuid(),
  code_snippet: null,
  trigger_category: "critical",
  timestamp: timestamp,
});

export const makeMockAlert = ({
  token_usage = false,
  type,
}: {
  token_usage?: boolean;
  type: "secret" | "malicious";
}): AlertConversation => {
  const timestamp = faker.date.recent().toUTCString();

  const base: Omit<AlertConversation, "trigger_type" | "trigger_string"> =
    getBaseAlert({
      timestamp,
      token_usage_agg: token_usage ? TOKEN_USAGE_AGG : null,
    });

  switch (type) {
    case "malicious": {
      const result: AlertConversation = {
        ...base,
        ...ALERT_MALICIOUS_FIELDS,
      };

      return result;
    }
    case "secret": {
      const result: AlertConversation = {
        ...base,
        ...ALERT_SECRET_FIELDS,
      };

      return result;
    }
  }
};
