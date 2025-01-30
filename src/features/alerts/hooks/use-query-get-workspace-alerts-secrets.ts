import {
  V1GetWorkspaceAlertsResponse,
  AlertConversation,
} from "@/api/generated";
import { filterAlertsCritical } from "../lib/filter-alerts-critical";
import { isAlertSecret } from "../lib/is-alert-secret";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render.
function select(data: V1GetWorkspaceAlertsResponse): AlertConversation[] {
  return filterAlertsCritical(data).filter(isAlertSecret);
}

export function useQueryGetWorkspaceAlertSecrets() {
  return useQueryGetWorkspaceAlerts({
    select,
  });
}
