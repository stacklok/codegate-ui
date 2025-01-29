import { useQuery } from "@tanstack/react-query";
import { v1ListAllModelsForAllProvidersOptions } from "@/api/generated/@tanstack/react-query.gen";
import { V1ListAllModelsForAllProvidersResponse } from "@/api/generated";

export const useModelsData = () => {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    queryFn: async () => {
      const response: V1ListAllModelsForAllProvidersResponse = [
        {
          name: "claude-3.5",
          provider_name: "anthropic",
          provider_id: "anthropic",
        },
        {
          name: "claude-3.6",
          provider_name: "anthropic",
          provider_id: "anthropic",
        },
        {
          name: "claude-3.7",
          provider_name: "anthropic",
          provider_id: "anthropic",
        },
        { name: "chatgpt-4o", provider_name: "openai", provider_id: "openai" },
        { name: "chatgpt-4p", provider_name: "openai", provider_id: "openai" },
      ];

      return response;
    },
  });
};
