import { MuxRule, V1GetWorkspaceMuxesData } from "@/api/generated";
import { v1GetWorkspaceMuxesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { create } from "zustand";

export type ModelRule = Omit<MuxRule, "matcher_type" | "matcher"> & {};

type State = {
  setPreferredModel: (model: ModelRule) => void;
  preferredModel: ModelRule;
};

const useModelValue = create<State>((set) => ({
  preferredModel: {
    provider_id: "",
    model: "",
  },
  setPreferredModel: ({ model, provider_id }: ModelRule) => {
    set({ preferredModel: { provider_id, model } });
  },
}));

const usePreferredModel = (options: {
  path: {
    workspace_name: string;
  };
}) => {
  return useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
  });
};

export const usePreferredModelWorkspace = (workspaceName: string) => {
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, "body"> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName],
  );
  const { data } = usePreferredModel(options);
  const { preferredModel, setPreferredModel } = useModelValue();

  useEffect(() => {
    const providerModel = data?.[0];
    if (providerModel) {
      setPreferredModel(providerModel);
    }
  }, [data, setPreferredModel]);

  return { preferredModel, setPreferredModel };
};
