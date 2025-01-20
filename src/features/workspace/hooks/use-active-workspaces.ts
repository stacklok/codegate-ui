import { v1ListActiveWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useActiveWorkspaces() {
  return useQuery({
    ...v1ListActiveWorkspacesOptions(),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
}
