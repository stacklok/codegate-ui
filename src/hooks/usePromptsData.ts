import { useQuery } from "@tanstack/react-query";
import { serverApi } from "@/api/service";
import { Conversation } from "@/api/generated";

const fetchPrompts = async (): Promise<Conversation[]> => {
  const { getMessagesDashboardMessagesGet } = await serverApi();
  const { data } = await getMessagesDashboardMessagesGet();

  if (!data) return [];

  return data.filter((prompt) =>
    prompt.question_answers?.every((item) => item.answer && item.question),
  );
};

export const usePromptsData = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: fetchPrompts,
  });
};
