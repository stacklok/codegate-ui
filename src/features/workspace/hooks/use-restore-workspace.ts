import {
  v1ListArchivedWorkspacesQueryKey,
  v1ListWorkspacesOptions,
  v1RecoverWorkspaceMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { toast } from "@stacklok/ui-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRestoreWorkspace() {
  const queryClient = useQueryClient();

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
        queryKey: v1ListWorkspacesOptions(),
        refetchType: "all",
      });
    },
  });
}
