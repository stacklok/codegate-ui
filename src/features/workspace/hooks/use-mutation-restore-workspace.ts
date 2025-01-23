import { v1RecoverWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";

export function useMutationRestoreWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();

  return useToastMutation({
    ...v1RecoverWorkspaceMutation(),
    onSuccess: () => invalidate(),
    successMsg: (variables) =>
      `Restored "${variables.path.workspace_name}" workspace`,
  });
}
