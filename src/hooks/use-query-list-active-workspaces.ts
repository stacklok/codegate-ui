import { ListActiveWorkspacesResponse } from "@/api/generated";
import { v1ListActiveWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useQueryListActiveWorkspaces<T = ListActiveWorkspacesResponse>({
  select,
}: {
  select?: (data?: ListActiveWorkspacesResponse) => T;
} = {}) {
  return useQuery({
    ...v1ListActiveWorkspacesOptions(),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
    retry: false,
    select,
  });
}
