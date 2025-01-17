import { useQuery } from "@tanstack/react-query";
import { Conversation, V1GetMessagesResponse } from "@/api/generated";
import { v1GetMessagesOptions } from "@/api/generated/@tanstack/react-query.gen";

const selectConversations = (data: V1GetMessagesResponse): Conversation[] => {
  return data.filter((prompt) =>
    prompt.question_answers?.every((item) => item.answer && item.question),
  );
};

export const usePromptsData = () => {
  return useQuery({
    ...v1GetMessagesOptions(),
    select: selectConversations,
  });
};
