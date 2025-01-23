import { v1ActivateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation as useToastMutation } from "@/hooks/use-toast-mutation";
import { useQueryClient } from "@tanstack/react-query";

export function useMutationActivateWorkspace() {
  const queryClient = useQueryClient();

  return useToastMutation({
    ...v1ActivateWorkspaceMutation(),
    onSuccess: () => queryClient.invalidateQueries({ refetchType: "all" }), // Global setting, refetch **everything**
    successMsg: (variables) => `Activated "${variables.body.name}" workspace`,
  });
}
