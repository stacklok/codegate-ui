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
  console.debug("👉  activeWorkspaceName:", activeWorkspaceName);

  return useToastMutation({
    ...v1DeleteWorkspaceMutation(),
    onMutate: async (variables) => {
      // These conditions would cause the archive operation to error
      if (variables.path.workspace_name === "default") return;
      if (variables.path.workspace_name === activeWorkspaceName) return;

      try {
        // Cancel any outgoing refetches
        // Prevents the refetch from overwriting the optimistic update
        await queryClient.cancelQueries({
          queryKey: v1ListWorkspacesQueryKey(),
        });
        await queryClient.cancelQueries({
          queryKey: v1ListArchivedWorkspacesQueryKey(),
        });

        // Optimistically remove the archived workspace from the list
        queryClient.setQueryData(
          v1ListWorkspacesQueryKey(),
          (old: V1ListWorkspacesResponse | null) => ({
            workspaces: old
              ? [...old.workspaces].filter(
                  (o) => o.name !== variables.path.workspace_name,
                )
              : [],
          }),
        );
        // Optimistically add the archived workspace to the archived list
        queryClient.setQueryData(
          v1ListArchivedWorkspacesQueryKey(),
          (old: V1ListArchivedWorkspacesResponse | null) => ({
            workspaces: old
              ? [...old.workspaces, { name: variables.path.workspace_name }]
              : [],
          }),
        );
      } catch (e) {
        console.log(e);
      }
      return {};
    },
    onSettled: async () => {
      await invalidate();
    },
    onError: async (e) => {
      console.error(e);
      await invalidate();
    },
    successMsg: (variables) =>
      `Archived "${variables.path.workspace_name}" workspace`,
  });
}
