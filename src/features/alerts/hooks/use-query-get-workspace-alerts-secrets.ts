import { filterAlertsCritical } from "../lib/filter-alerts-critical";
import { isAlertSecret } from "../lib/is-alert-secret";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";

export function useQueryGetWorkspaceAlertSecrets() {
  return useQueryGetWorkspaceAlerts({
    select: (data) => filterAlertsCritical(data).filter(isAlertSecret),
  });
}
