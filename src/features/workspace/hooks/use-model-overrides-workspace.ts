import { MuxRule } from "@/api/generated";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type OverrideRule = Omit<MuxRule, "matcher_type"> & {
  id: string;
};

type State = {
  removeOverride: (index: number) => void;
  resetOverrides: () => void;
  addOverride: () => void;
  setOverrides: (overrides: OverrideRule[]) => void;
  setOverrideItem: (
    idToChange: string,
    {
      model,
      matcher,
    }: {
      matcher?: string;
      model?: string;
    },
  ) => void;
  overrides: OverrideRule[];
};

export const useModelOverridesWorkspace = create<State>((set, get) => ({
  overrides: [
    {
      id: uuidv4(),
      provider: "anthropic",
      model: "claude-3.5",
      matcher: "",
    },
    {
      id: uuidv4(),
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
        { id: uuidv4(), matcher: "", model: "", provider: "" },
      ],
    });
  },
  resetOverrides: () => {
    set({
      overrides: [{ id: uuidv4(), matcher: "", model: "", provider: "" }],
    });
  },
  removeOverride: (overrideIndex: number) => {
    const { overrides } = get();
    set({
      overrides: overrides.filter((_, index) => index !== overrideIndex),
    });
  },
  setOverrides: (overrides: OverrideRule[]) => {
    set({ overrides });
  },
  setOverrideItem: (idToChange, { model, matcher }) => {
    const { overrides } = get();

    set({
      overrides: overrides.map((item) =>
        item.id === idToChange
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
