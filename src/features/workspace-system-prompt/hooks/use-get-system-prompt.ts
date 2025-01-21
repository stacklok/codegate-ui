import { v1GetWorkspaceSystemPromptOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useGetSystemPrompt(options: {
  path: {
    workspace_name: string;
  };
}) {
  return useQuery({
    ...v1GetWorkspaceSystemPromptOptions(options),
  });
}
