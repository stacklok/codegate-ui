import {
  v1GetWorkspaceAlerts,
  V1GetWorkspaceAlertsData,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";
import { v1GetWorkspaceAlertsQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { useQueryActiveWorkspaceName } from "@/hooks/use-query-active-workspace-name";
import { dedupeByKeys } from "@/lib/dedupe-by-keys";
import { isAlertCritical } from "@/lib/is-alert-critical";
import { getQueryCacheConfig } from "@/lib/react-query-utils";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export function useQueryGetWorkspaceAlerts<T = V1GetWorkspaceAlertsResponse>({
  select,
}: {
  select?: (data: V1GetWorkspaceAlertsResponse) => T;
} = {}) {
  const {
    data: activeWorkspaceName,
    isPending: isWorkspacePending,
    isFetching: isWorkspaceFetching,
    isLoading: isWorkspaceLoading,
    isRefetching: isWorkspaceRefetching,
  } = useQueryActiveWorkspaceName();

  const options: V1GetWorkspaceAlertsData = useMemo(
    () => ({
      path: {
        workspace_name: activeWorkspaceName ?? "default",
      },
    }),
    [activeWorkspaceName],
  );

  // Intentionally hand-composing the queryFn, as we have to iterate over every
  // alert and remove any duplicates, which is an expensive operation. We should
  // at least cache the result of this.
  const queryFn = useCallback(
    async ({
      queryKey,
      signal,
    }: {
      queryKey: ReturnType<typeof v1GetWorkspaceAlertsQueryKey>;
      signal: AbortSignal;
    }) => {
      const { data } = await v1GetWorkspaceAlerts({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });

      // Ugly de-duplication hack
      return dedupeByKeys(data.filter(isAlertCritical), ["alert_id"]);
    },
    [options],
  );

  const {
    isPending: isAlertsPending,
    isFetching: isAlertsFetching,
    isLoading: isAlertsLoading,
    isRefetching: isAlertsRefetching,
    ...rest
  } = useQuery({
    // eslint-disable-next-line no-restricted-syntax
    queryFn,
    // eslint-disable-next-line no-restricted-syntax
    queryKey: v1GetWorkspaceAlertsQueryKey(options),
    ...getQueryCacheConfig("5s"),
    select,
  });

  return {
    ...rest,
    isPending: isAlertsPending || isWorkspacePending,
    isFetching: isAlertsFetching || isWorkspaceFetching,
    isLoading: isAlertsLoading || isWorkspaceLoading,
    isRefetching: isAlertsRefetching || isWorkspaceRefetching,
  };
}
