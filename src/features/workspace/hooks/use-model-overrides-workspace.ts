import { MuxRule } from "@/api/generated";
import { create } from "zustand";

export type OverrideRule = Omit<MuxRule, "matcher_type"> & {
  id: number;
};

type State = {
  removeOverride: (index: number) => void;
  addOverride: () => void;
  setOverrides: (overrides: OverrideRule[]) => void;
  setOverrideItem: (
    index: number,
    {
      id,
      model,
      matcher,
    }: {
      matcher?: string;
      id?: number;
      model?: string;
    },
  ) => void;
  overrides: OverrideRule[];
};

export const useModelOverridesWorkspace = create<State>((set, get) => ({
  overrides: [
    {
      id: 0,
      provider: "anthropic",
      model: "claude-3.5",
      matcher: "",
    },
    {
      id: 1,
      provider: "anthropic",
      model: "claude-3.7",
      matcher: "hello",
    },
  ],
  addOverride: () => {
    const { overrides } = get();
    set({
      overrides: [
        ...overrides,
        { id: overrides.length, matcher: "", model: "", provider: "" },
      ],
    });
  },
  removeOverride: (overrideIndex: number) => {
    const { overrides } = get();
    set({
      overrides: overrides.filter((_, index) => index !== overrideIndex),
    });
  },
  setOverrides: (overrides: OverrideRule[]) => {
    console.log("setting overrides", overrides);
    set({ overrides });
  },
  setOverrideItem: (index, { id, model, matcher }) => {
    const { overrides } = get();

    set({
      overrides: overrides.map((item, jndex) =>
        jndex === index
          ? {
              ...item,
              model: model ?? item.model,
              matcher: matcher ?? item.matcher,
              id: id ?? item.id,
            }
          : item,
      ),
    });
  },
}));
