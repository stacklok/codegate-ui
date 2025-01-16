import { create } from "zustand";

type CurrentPromptState = {
  currentPromptId: string;
  setCurrentPromptId: (id: string) => void;
};

export const useCurrentPromptStore = create<CurrentPromptState>((set) => ({
  currentPromptId: "",
  setCurrentPromptId: (id: string) => set({ currentPromptId: id }),
}));
