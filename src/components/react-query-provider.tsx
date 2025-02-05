import { V1ListActiveWorkspacesResponse } from "@/api/generated";
import { v1ListActiveWorkspacesQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { getQueryCacheConfig } from "@/lib/react-query-utils";
import {
  QueryCacheNotifyEvent,
  QueryClient,
  QueryClientProvider as VendorQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState, useEffect } from "react";

/**
 * Responsible for determining whether a queryKey attached to a queryCache event
 * is for the "list active workspaces" query.
 */
function isActiveWorkspacesQueryKey(queryKey: unknown): boolean {
  return (
    Array.isArray(queryKey) &&
    queryKey[0]._id === v1ListActiveWorkspacesQueryKey()[0]?._id
  );
}

/**
 * Responsible for extracting the incoming active workspace name from the deeply
 * nested payload attached to a queryCache event.
 */
function getWorkspaceName(event: QueryCacheNotifyEvent): string | null {
  if ("action" in event === false || "data" in event.action === false)
    return null;
  return (
    (event.action.data as V1ListActiveWorkspacesResponse | undefined | null)
      ?.workspaces[0]?.name ?? null
  );
}

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [activeWorkspaceName, setActiveWorkspaceName] = useState<string | null>(
    null,
  );

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            ...getQueryCacheConfig("short"),
          },
        },
      }),
  );

  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    const unsubscribe = queryCache.subscribe((event) => {
      if (
        event.type === "updated" &&
        event.action.type === "success" &&
        isActiveWorkspacesQueryKey(event.query.options.queryKey)
      ) {
        const newWorkspaceName: string | null = getWorkspaceName(event);
        if (
          newWorkspaceName === activeWorkspaceName ||
          newWorkspaceName === null
        )
          return;

        setActiveWorkspaceName(newWorkspaceName);

        void queryClient.invalidateQueries({
          refetchType: "all",
          // Avoid a continuous loop
          predicate(query) {
            return !isActiveWorkspacesQueryKey(query.queryKey);
          },
        });
      }
    });

    return () => {
      return unsubscribe();
    };
  }, [activeWorkspaceName, queryClient]);

  return (
    <VendorQueryClientProvider client={queryClient}>
      {children}
    </VendorQueryClientProvider>
  );
}
