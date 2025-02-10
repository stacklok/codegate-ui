import {
  Alert,
  Conversation,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";

/** @deprecated */
export function isAlertConversationSecret(
  alert: V1GetWorkspaceAlertsResponse[number],
) {
  return (
    alert?.trigger_category === "critical" &&
    alert.trigger_type === "codegate-secrets"
  );
}

export function isConversationWithSecretAlerts(
  conversation: Conversation | null,
): boolean {
  return conversation?.alerts?.some(isAlertSecret) ?? false;
}

export function isAlertSecret(alert: Alert) {
  return (
    alert?.trigger_category === "critical" &&
    alert.trigger_type === "codegate-secrets"
  );
}
