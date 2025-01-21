import { useQuery } from "@tanstack/react-query";
import { v1ListArchivedWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";

export const useArchivedWorkspaces = () => {
  return useQuery({
    ...v1ListArchivedWorkspacesOptions(),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
