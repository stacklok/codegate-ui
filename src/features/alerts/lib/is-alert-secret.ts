import { AlertConversation } from "@/api/generated";

export function isAlertSecret({
  trigger_type,
  trigger_category,
}: AlertConversation) {
  return trigger_category === "critical" && trigger_type === "codegate-secrets";
}
