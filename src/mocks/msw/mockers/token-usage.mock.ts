import { ProviderType, TokenUsageAggregate } from "@/api/generated";

export const TOKEN_USAGE_AGG = {
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
