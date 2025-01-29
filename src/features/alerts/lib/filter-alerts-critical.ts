import {
  AlertConversation,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";

export function filterAlertsCritical(
  alerts: V1GetWorkspaceAlertsResponse | undefined,
): AlertConversation[] {
  return (alerts ?? [])
    .filter(
      (alert): alert is AlertConversation =>
        alert !== null &&
        alert.trigger_category === "critical" &&
        alert?.conversation.question_answers.every(
          (item) => item.answer && item.question,
        ),
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
}
