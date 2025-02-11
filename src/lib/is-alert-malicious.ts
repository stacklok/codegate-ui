import { Alert, AlertConversation, Conversation } from "@/api/generated";

export function isConversationWithMaliciousAlerts(
  conversation: Conversation | null,
): boolean {
  return conversation?.alerts?.some(isAlertMalicious) ?? false;
}

export function isAlertMalicious(alert: Alert | AlertConversation | null) {
  return (
    alert?.trigger_category === "critical" &&
    alert.trigger_string !== null &&
    typeof alert.trigger_string === "object" &&
    "status" in alert.trigger_string &&
    alert.trigger_string.status === "malicious"
  );
}
