import { Alert, AlertConversation, Conversation } from '@/api/generated'

export function isConversationWithPII(
  conversation: Conversation | null
): boolean {
  return conversation?.alerts?.some(isAlertPii) ?? false
}

export function isAlertPii(alert: Alert | AlertConversation | null) {
  return (
    alert?.trigger_category === 'critical' &&
    alert.trigger_type === 'codegate-pii'
  )
}
