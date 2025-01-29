import { AlertConversation, TokenUsageAggregate } from "@/api/generated";

export function getAlertTokenUsage(
  alert: AlertConversation,
): TokenUsageAggregate | null {
  return alert.conversation.token_usage_agg;
}
