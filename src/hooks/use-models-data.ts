import { useQuery } from "@tanstack/react-query";
import { v1ListAllModelsForAllProvidersOptions } from "@/api/generated/@tanstack/react-query.gen";

export const useModelsData = () => {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
};
