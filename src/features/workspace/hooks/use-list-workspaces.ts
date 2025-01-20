import { useQuery } from "@tanstack/react-query";
import { v1ListWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";

export const useListWorkspaces = () => {
  return useQuery({
    ...v1ListWorkspacesOptions(),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
