import { create } from "zustand";
import { serverApi } from "@/api/service";
import { Conversation } from "@/api/generated";

type PromptsDataState = {
  prompts: Conversation[];
  loading: boolean;
  fetchPrompts: () => Promise<void>;
};

export const usePromptsDataStore = create<PromptsDataState>((set) => ({
  prompts: [],
  loading: false,
  fetchPrompts: async () => {
    set({ loading: true });
    const { getMessagesDashboardMessagesGet } = await serverApi();
    const { data } = await getMessagesDashboardMessagesGet();

    if (data !== undefined) {
      set({
        prompts: data.filter((prompt) =>
          prompt.question_answers?.every(
            (item) => item.answer && item.question,
          ),
        ),
        loading: false,
      });
    } else {
      set({ prompts: [], loading: false });
    }
  },
}));
