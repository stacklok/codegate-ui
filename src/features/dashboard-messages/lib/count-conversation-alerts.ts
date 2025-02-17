import { Alert } from '@/api/generated'
import { isAlertMalicious } from '@/lib/is-alert-malicious'
import { isAlertPii } from '@/lib/is-alert-pii'
import { isAlertSecret } from '@/lib/is-alert-secret'

export function countConversationAlerts(alerts: Alert[]): {
  secrets: number
  malicious: number
  pii: number
} {
  return {
    secrets: alerts.filter(isAlertSecret).length,
    malicious: alerts.filter(isAlertMalicious).length,
    pii: alerts.filter(isAlertPii).length,
  }
}
