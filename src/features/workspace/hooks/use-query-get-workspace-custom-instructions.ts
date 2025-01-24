import { v1GetWorkspaceCustomInstructionsOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useQueryGetWorkspaceCustomInstructions(options: {
  path: {
    workspace_name: string;
  };
}) {
  return useQuery({
    ...v1GetWorkspaceCustomInstructionsOptions(options),
  });
}
