import { filterAlertsCritical } from "../lib/filter-alerts-critical";
import { isAlertMalicious } from "../lib/is-alert-malicious";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";

export function useQueryGetWorkspaceAlertsMaliciousPkg() {
  return useQueryGetWorkspaceAlerts({
    select: (data) => filterAlertsCritical(data).filter(isAlertMalicious),
  });
}
