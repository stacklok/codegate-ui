import { MuxRule } from "@/api/generated";
import { v1GetWorkspaceMuxesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export type ModelRule = Omit<MuxRule, "matcher_type" | "matcher"> & {};

export const useWorkspaceMuxes = (options: {
  path: {
    workspace_name: string;
  };
}) => {
  return useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
  });
};
