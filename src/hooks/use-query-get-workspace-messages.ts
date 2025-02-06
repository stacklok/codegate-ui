import { useQuery } from "@tanstack/react-query";
import {
  V1GetWorkspaceMessagesResponse,
  V1GetWorkspaceMessagesData,
} from "@/api/generated";
import { v1GetWorkspaceMessagesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useActiveWorkspaceName } from "@/features/workspace/hooks/use-active-workspace-name";
import { getQueryCacheConfig } from "@/lib/react-query-utils";

export const useQueryGetWorkspaceMessages = <
  T = V1GetWorkspaceMessagesResponse,
>({
  select,
}: {
  select?: (data: V1GetWorkspaceMessagesResponse) => T;
} = {}) => {
  const { data: activeWorkspaceName } = useActiveWorkspaceName();

  const options: V1GetWorkspaceMessagesData = {
    path: {
      workspace_name: activeWorkspaceName ?? "default",
    },
  };

  return useQuery({
    ...v1GetWorkspaceMessagesOptions(options),
    ...getQueryCacheConfig("5s"),
    select: select,
  });
};
