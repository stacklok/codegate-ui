import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateWorkspaceQueries } from "./use-invalidate-workspace-queries";
import { v1SetWorkspaceMuxesMutation } from "@/api/generated/@tanstack/react-query.gen";

export function useMutationModelOverridesWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries();
  return useToastMutation({
    ...v1SetWorkspaceMuxesMutation(),
    onSuccess: async () => {
      await invalidate();
    },
    successMsg: (variables) =>
      `Model overrides on ${variables.path.workspace_name} successfully submitted! `,
  });
}
