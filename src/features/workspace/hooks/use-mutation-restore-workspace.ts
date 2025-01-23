import {
  v1ListArchivedWorkspacesQueryKey,
  v1ListWorkspacesQueryKey,
  v1RecoverWorkspaceMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";
import {
  V1ListWorkspacesResponse,
  V1ListArchivedWorkspacesResponse,
} from "@/api/generated";
import { useQueryClient } from "@tanstack/react-query";

export function useMutationRestoreWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();
  const queryClient = useQueryClient();

  return useToastMutation({
    ...v1RecoverWorkspaceMutation(),
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      // Prevents the refetch from overwriting the optimistic update
      await queryClient.cancelQueries({
        queryKey: v1ListWorkspacesQueryKey(),
      });
      await queryClient.cancelQueries({
        queryKey: v1ListArchivedWorkspacesQueryKey(),
      });

      // Optimistically remove the workspace from the archived list
      queryClient.setQueryData(
        v1ListArchivedWorkspacesQueryKey(),
        (old: V1ListWorkspacesResponse) => ({
          workspaces: [...old.workspaces].filter(
            (o) => o.name !== variables.path.workspace_name,
          ),
        }),
      );
      // Optimistically add the workspace to the non-archived list
      queryClient.setQueryData(
        v1ListWorkspacesQueryKey(),
        (old: V1ListArchivedWorkspacesResponse) => ({
          workspaces: [
            ...old.workspaces,
            { name: variables.path.workspace_name },
          ],
        }),
      );

      return {};
    },
    onSettled: async () => {
      await invalidate();
    },
    onError: async () => {
      await invalidate();
    },
    successMsg: (variables) =>
      `Restored "${variables.path.workspace_name}" workspace`,
  });
}
