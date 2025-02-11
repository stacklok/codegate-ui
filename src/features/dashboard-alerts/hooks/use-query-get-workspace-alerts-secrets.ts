import { V1GetWorkspaceAlertsResponse } from "@/api/generated";
import { isAlertSecret } from "../../../lib/is-alert-secret";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";
import { multiFilter } from "@/lib/multi-filter";
import { isAlertCritical } from "../../../lib/is-alert-critical";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render
function select(data: V1GetWorkspaceAlertsResponse) {
  return multiFilter(data, [isAlertCritical, isAlertSecret]);
}

export function useQueryGetWorkspaceAlertSecrets() {
  return useQueryGetWorkspaceAlerts({
    select,
  });
}
