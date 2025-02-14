import {
  AlertConversation,
  V1GetWorkspaceAlertsResponse,
} from '@/api/generated'

export function isAlertCritical(
  alert: V1GetWorkspaceAlertsResponse[number]
): alert is AlertConversation {
  return alert !== null && alert.trigger_category === 'critical'
}
