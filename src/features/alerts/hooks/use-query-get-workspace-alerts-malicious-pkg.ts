import {
  AlertConversation,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";
import { filterAlertsCritical } from "../lib/filter-alerts-critical";
import { isAlertMalicious } from "../lib/is-alert-malicious";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render.
function select(data: V1GetWorkspaceAlertsResponse): AlertConversation[] {
  return filterAlertsCritical(data).filter(isAlertMalicious);
}

export function useQueryGetWorkspaceAlertsMaliciousPkg() {
  return useQueryGetWorkspaceAlerts({
    select,
  });
}
