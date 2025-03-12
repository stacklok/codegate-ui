import { Alert, AlertConversation } from '@/api/generated'

export function isAlertPii(alert: Alert | AlertConversation | null) {
  return (
    alert?.trigger_category === 'critical' &&
    alert.trigger_type === 'codegate-pii'
  )
}
