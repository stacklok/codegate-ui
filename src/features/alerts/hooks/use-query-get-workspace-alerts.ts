import {
  V1GetWorkspaceAlertsData,
  V1GetWorkspaceAlertsResponse,
} from "@/api/generated";
import { v1GetWorkspaceAlertsOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useActiveWorkspaceName } from "@/features/workspace/hooks/use-active-workspace-name";
import { useQuery } from "@tanstack/react-query";

export function useQueryGetWorkspaceAlerts<T = V1GetWorkspaceAlertsResponse>({
  select,
}: {
  select?: (data: V1GetWorkspaceAlertsResponse) => T;
} = {}) {
  const { data: activeWorkspaceName } = useActiveWorkspaceName();

  const options: V1GetWorkspaceAlertsData = {
    path: {
      workspace_name: activeWorkspaceName ?? "default",
    },
  };

  return useQuery({
    ...v1GetWorkspaceAlertsOptions(options),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    select,
  });
}
