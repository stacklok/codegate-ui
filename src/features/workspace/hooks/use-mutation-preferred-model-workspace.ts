import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";
import { v1SetWorkspaceMuxesMutation } from "@/api/generated/@tanstack/react-query.gen";

export function useMutationPreferredModelWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();
  return useToastMutation({
    ...v1SetWorkspaceMuxesMutation(),
    onSuccess: async () => {
      await invalidate();
    },
    successMsg: (variables) =>
      `Preferred model for ${variables.path.workspace_name} updated`,
  });
}
