import { Alert, AlertConversation } from "@/api/generated";

export function isAlertMalicious(
  alert: Alert | AlertConversation | null,
): alert is AlertConversation {
  return (
    alert?.trigger_category === "critical" &&
    alert.trigger_string !== null &&
    typeof alert.trigger_string === "object" &&
    "status" in alert.trigger_string &&
    alert.trigger_string.status === "malicious"
  );
}
