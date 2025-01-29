import { MuxRule } from "@/api/generated";
import { create } from "zustand";

export type ModelRule = Omit<MuxRule, "matcher_type" | "matcher"> & {};

type State = {
  setPreferredModel: (model: ModelRule) => void;
  preferredModel: ModelRule;
};

export const usePreferredModelWorkspace = create<State>((set) => ({
  preferredModel: {
    provider_id: "",
    model: "",
  },
  setPreferredModel: ({ model, provider_id }: ModelRule) => {
    set({ preferredModel: { provider_id, model } });
  },
}));
