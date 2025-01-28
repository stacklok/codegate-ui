import { useQuery } from "@tanstack/react-query";
import { v1ListAllModelsForAllProvidersOptions } from "@/api/generated/@tanstack/react-query.gen";
import { V1ListAllModelsForAllProvidersResponse } from "@/api/generated";

export const useModelsData = () => {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    queryFn: async () => {
      const response: V1ListAllModelsForAllProvidersResponse = [
        { name: "claude-3.5", provider: "anthropic" },
        { name: "claude-3.6", provider: "anthropic" },
        { name: "claude-3.7", provider: "anthropic" },
        { name: "chatgpt-4o", provider: "openai" },
        { name: "chatgpt-4p", provider: "openai" },
      ];

      return response;
    },
  });
};
