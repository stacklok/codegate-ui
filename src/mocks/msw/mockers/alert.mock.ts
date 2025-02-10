import { Alert, TokenUsageAggregate } from "@/api/generated";
import { faker } from "@faker-js/faker";
import { TOKEN_USAGE_AGG } from "./token-usage.mock";

const ALERT_SECRET_FIELDS = {
  trigger_string: "foo",
  trigger_type: "codegate-secrets",
} satisfies Pick<Alert, "trigger_string" | "trigger_type">;

const ALERT_MALICIOUS_FIELDS = {
  trigger_string: {
    name: "invokehttp",
    type: "pypi",
    status: "malicious",
    description: "Python HTTP for Humans.",
  },
  trigger_type: "codegate-context-retriever",
} satisfies Pick<Alert, "trigger_string" | "trigger_type">;

const getBaseAlert = ({
  timestamp,
}: {
  timestamp: string;
  token_usage_agg: TokenUsageAggregate | null;
}): Omit<Alert, "trigger_type" | "trigger_string"> => ({
  id: faker.string.uuid(),
  prompt_id: faker.string.uuid(),
  code_snippet: null,
  trigger_category: "critical",
  timestamp: timestamp,
});

export const mockAlert = ({
  token_usage = false,
  type,
}: {
  token_usage?: boolean;
  type: "secret" | "malicious";
}): Alert => {
  const timestamp = faker.date.recent().toISOString();

  const base: Omit<Alert, "trigger_type" | "trigger_string"> = getBaseAlert({
    timestamp,
    token_usage_agg: token_usage ? TOKEN_USAGE_AGG : null,
  });

  switch (type) {
    case "malicious": {
      const result: Alert = {
        ...base,
        ...ALERT_MALICIOUS_FIELDS,
      };

      return result;
    }
    case "secret": {
      const result: Alert = {
        ...base,
        ...ALERT_SECRET_FIELDS,
      };

      return result;
    }
  }
};
