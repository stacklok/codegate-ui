import { AlertConversation } from "@/api/generated";

export function isAlertMalicious({
  trigger_string,
  trigger_category,
}: AlertConversation) {
  return (
    trigger_category === "critical" &&
    trigger_string !== null &&
    typeof trigger_string === "object" &&
    "status" in trigger_string &&
    trigger_string.status === "malicious"
  );
}
