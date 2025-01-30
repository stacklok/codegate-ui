import { V1GetWorkspaceAlertsResponse } from "@/api/generated";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";
import { useCallback } from "react";
import {
  AlertsFilterView,
  useAlertsFilterSearchParams,
} from "./use-alerts-filter-search-params";
import { multiFilter } from "@/lib/multi-filter";
import { isAlertCritical } from "../lib/is-alert-critical";
import { isAlertMalicious } from "../lib/is-alert-malicious";
import { isAlertSecret } from "../lib/is-alert-secret";
import { doesAlertIncludeSearch } from "../lib/does-alert-include-search";
import { isAlertConversation } from "../lib/is-alert-conversation";

const FILTER: Record<
  AlertsFilterView,
  (alert: V1GetWorkspaceAlertsResponse[number]) => boolean
> = {
  all: () => true,
  malicious: isAlertMalicious,
  secrets: isAlertSecret,
};

export function useQueryGetWorkspaceAlertTable() {
  const { state } = useAlertsFilterSearchParams();

  // NOTE: This needs to be a stable function reference to enable memo-isation
  // of the select operation on each React re-render.
  const select = useCallback(
    (data: V1GetWorkspaceAlertsResponse) => {
      return multiFilter(data, [
        isAlertCritical,
        isAlertConversation,
        FILTER[state.view],
      ]).filter((alert) => doesAlertIncludeSearch(alert, state.search ?? null));
    },
    [state.search, state.view],
  );

  return useQueryGetWorkspaceAlerts({
    select,
  });
}
