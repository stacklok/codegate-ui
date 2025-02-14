import { Alert } from "@/api/generated";
import { isAlertMalicious } from "@/lib/is-alert-malicious";
import { isAlertSecret } from "@/lib/is-alert-secret";

export function countConversationAlerts(alerts: Alert[]): {
  secrets: number;
  malicious: number;
} {
  return {
    secrets: alerts.filter(isAlertSecret).length,
    malicious: alerts.filter(isAlertMalicious).length,
  };
}
