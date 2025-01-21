import { useMutation } from "@tanstack/react-query";
import { v1SetWorkspaceSystemPromptMutation } from "@/api/generated/@tanstack/react-query.gen";
import { V1GetWorkspaceSystemPromptData } from "@/api/generated";

export function usePostSystemPrompt(options: V1GetWorkspaceSystemPromptData) {
  return useMutation({
    ...v1SetWorkspaceSystemPromptMutation(options),
  });
}
