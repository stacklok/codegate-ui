import {
  v1DeleteWorkspaceMutation,
  v1ListArchivedWorkspacesQueryKey,
  v1ListWorkspacesQueryKey,
} from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  V1ListArchivedWorkspacesResponse,
  V1ListWorkspacesResponse,
} from "@/api/generated";
import { useActiveWorkspaceName } from "./use-active-workspace-name";

export function useMutationArchiveWorkspace() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateWorkspaceQueries();
  const { data: activeWorkspaceName } = useActiveWorkspaceName();

  return useToastMutation({
    ...v1DeleteWorkspaceMutation(),
    onMutate: async (variables) => {
      // These conditions would cause the archive operation to error
      if (variables.path.workspace_name === "default") return;
      if (variables.path.workspace_name === activeWorkspaceName) return;

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
      await queryClient.setQueryData(
        v1ListWorkspacesQueryKey(),
        (old: V1ListWorkspacesResponse | null) => ({
          workspaces: old
            ? [...old.workspaces].filter(
                (o) => o.name !== variables.path.workspace_name,
              )
            : [],
        }),
      );
      await queryClient.setQueryData(
        v1ListArchivedWorkspacesQueryKey(),
        (old: V1ListArchivedWorkspacesResponse | null) => ({
          workspaces: old
            ? [...old.workspaces, { name: variables.path.workspace_name }]
            : [],
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
      `Archived "${variables.path.workspace_name}" workspace`,
  });
}
