import { v1CreateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";
import { useToastMutation } from "@/hooks/use-toast-mutation";

export function useMutationCreateWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();

  return useToastMutation({
    ...v1CreateWorkspaceMutation(),
    onSuccess: () => invalidate(),
    successMsg: (variables) => `Created "${variables.body.name}" workspace`,
  });
}
