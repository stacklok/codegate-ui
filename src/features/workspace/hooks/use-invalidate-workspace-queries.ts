import {
  v1ListArchivedWorkspacesQueryKey,
  v1ListWorkspacesOptions,
} from "@/api/generated/@tanstack/react-query.gen";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateWorkspaceQueries() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: v1ListWorkspacesOptions(),
      refetchType: "all",
    });
    await queryClient.invalidateQueries({
      queryKey: v1ListArchivedWorkspacesQueryKey(),
      refetchType: "all",
    });
  }, [queryClient]);

  return invalidate;
}
