import {
  v1GetWorkspaceCustomInstructionsQueryKey,
  v1SetWorkspaceCustomInstructionsMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { V1GetWorkspaceCustomInstructionsData } from "@/api/generated";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useQueryClient } from "@tanstack/react-query";

export function useMutationSetWorkspaceCustomInstructions(
  options: V1GetWorkspaceCustomInstructionsData,
) {
  const queryClient = useQueryClient();

  return useToastMutation({
    ...v1SetWorkspaceCustomInstructionsMutation(options),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: v1GetWorkspaceCustomInstructionsQueryKey(options),
        refetchType: "all",
      }),
    successMsg: "Successfully updated custom instructions",
  });
}
