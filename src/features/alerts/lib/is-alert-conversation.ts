import {
  AlertConversation,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";

export function isAlertConversation(
  alert: V1GetWorkspaceAlertsResponse[number],
): alert is AlertConversation {
  return Boolean(
    alert?.conversation.question_answers.every(
      (item) => item.answer && item.question,
    ),
  );
}
