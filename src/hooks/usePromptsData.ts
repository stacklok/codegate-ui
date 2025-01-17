import { useQuery } from "@tanstack/react-query";
import {
  Conversation,
  GetMessagesDashboardMessagesGetResponse,
} from "@/api/generated";
import { getMessagesDashboardMessagesGetOptions } from "@/api/generated/@tanstack/react-query.gen";

const selectConversations = (
  data: GetMessagesDashboardMessagesGetResponse,
): Conversation[] => {
  return data.filter((prompt) =>
    prompt.question_answers?.every((item) => item.answer && item.question),
  );
};

export const usePromptsData = () => {
  return useQuery({
    ...getMessagesDashboardMessagesGetOptions(),
    select: selectConversations,
  });
};
