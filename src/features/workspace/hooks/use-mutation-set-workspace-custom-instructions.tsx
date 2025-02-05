import {
  v1GetWorkspaceCustomInstructionsQueryKey,
  v1SetWorkspaceCustomInstructionsMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { V1GetWorkspaceCustomInstructionsData } from "@/api/generated";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateQueries } from "@/lib/react-query-utils";

export function useMutationSetWorkspaceCustomInstructions(
  options: V1GetWorkspaceCustomInstructionsData,
) {
  const queryClient = useQueryClient();

  return useToastMutation({
    ...v1SetWorkspaceCustomInstructionsMutation(options),
    onSuccess: () =>
      invalidateQueries(queryClient, [
        v1GetWorkspaceCustomInstructionsQueryKey,
      ]),
    successMsg: "Successfully updated custom instructions",
  });
}
