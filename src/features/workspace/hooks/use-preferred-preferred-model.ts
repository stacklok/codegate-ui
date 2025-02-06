import { MuxRule, V1GetWorkspaceMuxesData } from "@/api/generated";
import { v1GetWorkspaceMuxesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export type ModelRule = Omit<MuxRule, "matcher_type" | "matcher"> & {};

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
  const [preferredModel, setPreferredModel] = useState<ModelRule>({
    provider_id: "",
    model: "",
  });
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, "body"> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName],
  );
  const { data } = usePreferredModel(options);

  useEffect(() => {
    const providerModel = data?.[0];
    if (providerModel) {
      setPreferredModel(providerModel);
    }
  }, [data, setPreferredModel]);

  return { preferredModel, setPreferredModel };
};
