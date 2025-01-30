import { V1GetWorkspaceAlertsResponse } from "@/api/generated";

export function isAlertSecret(alert: V1GetWorkspaceAlertsResponse[number]) {
  return (
    alert?.trigger_category === "critical" &&
    alert.trigger_type === "codegate-secrets"
  );
}
