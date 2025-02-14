import { Alert, AlertConversation, Conversation } from '@/api/generated'

export function isConversationWithSecretAlerts(
  conversation: Conversation | null
): boolean {
  return conversation?.alerts?.some(isAlertSecret) ?? false
}

export function isAlertSecret(alert: Alert | AlertConversation | null) {
  return (
    alert?.trigger_category === 'critical' &&
    alert.trigger_type === 'codegate-secrets'
  )
}
