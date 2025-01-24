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

      // Snapshot the previous data
      const prevWorkspaces = queryClient.getQueryData(
        v1ListWorkspacesQueryKey(),
      );
      const prevArchivedWorkspaces = queryClient.getQueryData(
        v1ListArchivedWorkspacesQueryKey(),
      );

      if (!prevWorkspaces || !prevArchivedWorkspaces) return;

      // Optimistically update values in cache
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

      return {
        prevWorkspaces,
        prevArchivedWorkspaces,
      };
    },
    onSettled: async () => {
      await invalidate();
    },
    // Rollback cache updates on error
    onError: async (_a, _b, context) => {
      queryClient.setQueryData(
        v1ListWorkspacesQueryKey(),
        context?.prevWorkspaces,
      );
      queryClient.setQueryData(
        v1ListArchivedWorkspacesQueryKey(),
        context?.prevArchivedWorkspaces,
      );
    },
    successMsg: (variables) =>
      `Restored "${variables.path.workspace_name}" workspace`,
  });
}
