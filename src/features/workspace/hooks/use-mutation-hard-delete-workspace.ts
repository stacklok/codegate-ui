import { v1HardDeleteWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";

export function useMutationHardDeleteWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();

  return useToastMutation({
    ...v1HardDeleteWorkspaceMutation(),
    onSuccess: () => invalidate(),
    successMsg: (variables) =>
      `Permanently deleted "${variables.path.workspace_name}" workspace`,
  });
}
