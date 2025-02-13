import { V1GetWorkspaceMuxesData } from "@/api/generated";
import { v1GetWorkspaceMuxesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useQueryMuxingRulesWorkspace = (workspace_name: string) => {
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, "body"> = useMemo(
    () => ({
      path: { workspace_name },
    }),
    [workspace_name],
  );

  const { data = [], ...rest } = useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
  });

  return { data: data, ...rest };
};
