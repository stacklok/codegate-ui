import { v1DeleteWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";

export function useMutationArchiveWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();

  return useToastMutation({
    ...v1DeleteWorkspaceMutation(),
    onSuccess: () => invalidate(),
    successMsg: (variables) =>
      `Archived "${variables.path.workspace_name}" workspace`,
  });
}
