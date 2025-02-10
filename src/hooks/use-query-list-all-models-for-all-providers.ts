import { useQuery } from "@tanstack/react-query";
import { v1ListAllModelsForAllProvidersOptions } from "@/api/generated/@tanstack/react-query.gen";

export const useQueryListAllModelsForAllProviders = () => {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
  });
};
