import { useQuery } from "@tanstack/react-query";
import {
  V1GetWorkspaceMessagesResponse,
  V1GetWorkspaceMessagesData,
  v1GetWorkspaceMessages,
} from "@/api/generated";
import { v1GetWorkspaceMessagesQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { useQueryActiveWorkspaceName } from "@/hooks/use-query-active-workspace-name";
import { getQueryCacheConfig } from "@/lib/react-query-utils";
import { useCallback, useMemo } from "react";
import { dedupeByKeys } from "@/lib/dedupe-by-keys";

export const useQueryGetWorkspaceMessages = <
  T = V1GetWorkspaceMessagesResponse,
>({
  select,
}: {
  select?: (data: V1GetWorkspaceMessagesResponse) => T;
} = {}) => {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName();

  const options: V1GetWorkspaceMessagesData = useMemo(
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
      queryKey: ReturnType<typeof v1GetWorkspaceMessagesQueryKey>;
      signal: AbortSignal;
    }) => {
      const { data } = await v1GetWorkspaceMessages({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });

      // Ugly de-duplication hack
      return data.map((conversation) =>
        conversation.alerts && conversation.alerts?.length > 0
          ? {
              ...conversation,
              alerts: dedupeByKeys(conversation.alerts, ["id"]),
            }
          : conversation,
      );
    },
    [options],
  );

  return useQuery({
    // eslint-disable-next-line no-restricted-syntax
    queryFn,
    // eslint-disable-next-line no-restricted-syntax
    queryKey: v1GetWorkspaceMessagesQueryKey(options),
    ...getQueryCacheConfig("5s"),
    select: select,
  });
};
