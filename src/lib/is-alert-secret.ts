import { Alert, AlertConversation } from '@/api/generated'

export function isAlertSecret(alert: Alert | AlertConversation | null) {
  return (
    alert?.trigger_category === 'critical' &&
    alert.trigger_type === 'codegate-secrets'
  )
}
