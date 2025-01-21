import { V1CreateWorkspaceData } from "@/api/generated";
import {
  v1CreateWorkspaceQueryKey,
  v1ListArchivedWorkspacesQueryKey,
  v1RecoverWorkspaceMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { toast } from "@stacklok/ui-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useRestoreWorkspace(name: string) {
  const queryClient = useQueryClient();

  const options: V1CreateWorkspaceData = useMemo(
    () => ({
      body: { name },
    }),
    [name],
  );

  return useMutation({
    ...v1RecoverWorkspaceMutation(),
    onError: (err) => {
      toast.error(err.detail ? `${err.detail}` : "Failed to restore workspace");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: v1ListArchivedWorkspacesQueryKey(),
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: v1CreateWorkspaceQueryKey(options),
        refetchType: "all",
      });
    },
  });
}
