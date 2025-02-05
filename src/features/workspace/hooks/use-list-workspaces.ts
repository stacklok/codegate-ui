import { useQuery } from "@tanstack/react-query";
import { v1ListWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { V1ListWorkspacesResponse } from "@/api/generated";

export function useListWorkspaces<T = V1ListWorkspacesResponse>({
  select,
}: {
  select?: (data: V1ListWorkspacesResponse) => T;
} = {}) {
  return useQuery({
    ...v1ListWorkspacesOptions(),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    retry: false,
    select,
  });
}
