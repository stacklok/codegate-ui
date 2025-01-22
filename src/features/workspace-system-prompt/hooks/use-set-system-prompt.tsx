import { useMutation } from "@tanstack/react-query";
import { v1SetWorkspaceCustomInstructionsMutation } from "@/api/generated/@tanstack/react-query.gen";
import { V1GetWorkspaceCustomInstructionsData } from "@/api/generated";

export function usePostSystemPrompt(
  options: V1GetWorkspaceCustomInstructionsData,
) {
  return useMutation({
    ...v1SetWorkspaceCustomInstructionsMutation(options),
  });
}
