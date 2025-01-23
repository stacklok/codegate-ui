import { v1ActivateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation as useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";

export function useMutationActivateWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();

  return useToastMutation({
    ...v1ActivateWorkspaceMutation(),
    onSuccess: () => invalidate(),
    successMsg: (variables) => `Activated "${variables.body.name}" workspace`,
  });
}
