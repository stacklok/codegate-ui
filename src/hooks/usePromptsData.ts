import { useQuery } from "@tanstack/react-query";
import {
  Conversation,
  V1GetWorkspaceMessagesResponse,
  V1GetWorkspaceMessagesData,
} from "@/api/generated";
import { v1GetWorkspaceMessagesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useActiveWorkspaceName } from "@/features/workspace/hooks/use-active-workspace-name";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render.
function select(data: V1GetWorkspaceMessagesResponse): Conversation[] {
  return data.filter((prompt) =>
    prompt.question_answers?.every((item) => item.answer && item.question),
  );
}

export const usePromptsData = () => {
  const { data: activeWorkspaceName } = useActiveWorkspaceName();

  const options: V1GetWorkspaceMessagesData = {
    path: {
      workspace_name: activeWorkspaceName ?? "default",
    },
  };

  return useQuery({
    ...v1GetWorkspaceMessagesOptions(options),
    select: select,
  });
};
