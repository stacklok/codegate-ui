import { MuxRule } from "@/api/generated";
import { create } from "zustand";

type State = {
  setOverrides: () => void;
  setOverrideItem: ({
    id,
    model,
    matcher,
  }: {
    matcher?: string;
    id: number;
    model?: string;
  }) => void;
  overrides: Omit<MuxRule, "matcher_type">[];
};

export const useModelOverridesWorkspace = create<State>((set, get) => ({
  overrides: [
    {
      provider: "anthropic",
      model: "claude-3.5",
      matcher: "",
    },
    {
      provider: "anthropic",
      model: "claude-3.7",
      matcher: "hello",
    },
  ],
  setOverrides: () => {},
  setOverrideItem: ({ id, model, matcher }) => {
    const { overrides } = get();

    set({
      overrides: overrides.map((item, index) =>
        index === id
          ? {
              ...item,
              model: model ?? item.model,
              matcher: matcher ?? item.matcher,
            }
          : item,
      ),
    });
  },
}));
