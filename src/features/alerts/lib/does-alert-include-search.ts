import {
  AlertConversation,
  Conversation,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";
import { isAlertMalicious } from "./is-alert-malicious";

export function doesAlertIncludeSearch(
  alert: V1GetWorkspaceAlertsResponse[number],
  searchQuery: string | null,
): alert is AlertConversation {
  if (alert == null) return false;
  if (searchQuery === null) return true;

  const trigger_type: string = alert.trigger_type;
  const trigger_string: string | null =
    typeof alert.trigger_string === "string" ? alert.trigger_string : null;

  let malicious_pkg_name: string | null = null;
  let malicious_pkg_type: string | null = null;

  if (
    alert.trigger_string !== null &&
    typeof alert.trigger_string === "object" &&
    "name" in alert.trigger_string &&
    typeof alert.trigger_string.name === "string" &&
    "type" in alert.trigger_string &&
    typeof alert.trigger_string.type === "string"
  ) {
    malicious_pkg_name = alert.trigger_string.name;
    malicious_pkg_type = alert.trigger_string.type;
  }

  return [
    trigger_type,
    trigger_string,
    malicious_pkg_name,
    malicious_pkg_type,
  ].some((i) => i?.toLowerCase().includes(searchQuery));
}

export function doesConversationIncludeSearch(
  conversation: Conversation,
  searchQuery: string | null,
): boolean {
  if (conversation == null) return false;
  if (searchQuery === null) return true;

  const trigger_types: string[] =
    conversation.alerts?.map((a) => a.trigger_type) ?? [];

  const trigger_strings: string[] =
    conversation.alerts
      ?.map((a) =>
        typeof a.trigger_string === "string" ? a.trigger_string : "",
      )
      .filter(Boolean) ?? [];

  const malicious_pkg_names: string[] =
    conversation.alerts?.map((a) =>
      isAlertMalicious(a) ? (a.trigger_string as { name: string }).name : "",
    ) ?? [];

  const malicious_pkg_types: string[] =
    conversation.alerts?.map((a) =>
      isAlertMalicious(a) ? (a.trigger_string as { type: string }).type : "",
    ) ?? [];

  return [
    ...trigger_types,
    ...trigger_strings,
    ...malicious_pkg_names,
    ...malicious_pkg_types,
  ].some((i) => i?.toLowerCase().includes(searchQuery));
}
