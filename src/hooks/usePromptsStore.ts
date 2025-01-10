import { create } from "zustand";
import { PromptState } from "../types";
import { serverApi } from "@/api/service";

export const usePromptsStore = create<PromptState>((set) => ({
  prompts: [],
  loading: false,
  currentPromptId: "",
  setCurrentPromptId: (id: string) => set({ currentPromptId: id }),
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
