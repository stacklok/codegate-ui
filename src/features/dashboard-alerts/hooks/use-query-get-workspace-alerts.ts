import {
  V1GetWorkspaceAlertsData,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";
import { v1GetWorkspaceAlertsOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQueryActiveWorkspaceName } from "@/hooks/use-query-active-workspace-name";
import { getQueryCacheConfig } from "@/lib/react-query-utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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

  const {
    isPending: isAlertsPending,
    isFetching: isAlertsFetching,
    isLoading: isAlertsLoading,
    isRefetching: isAlertsRefetching,
    ...rest
  } = useQuery({
    ...v1GetWorkspaceAlertsOptions(options),
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
