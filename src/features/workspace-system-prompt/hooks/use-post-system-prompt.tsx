import { useMutation } from "@tanstack/react-query";
import { postSystemPrompt } from "../lib/post-system-prompt";

export function usePostSystemPrompt() {
  // TODO: Get queryclient, invalidate "get system prompt" query

  return useMutation({
    mutationFn: postSystemPrompt,
  });
}
