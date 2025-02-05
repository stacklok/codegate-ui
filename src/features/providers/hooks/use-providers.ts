import { useQuery } from "@tanstack/react-query";
import { v1ListProviderEndpointsOptions } from "@/api/generated/@tanstack/react-query.gen";

export function useProviders() {
  return useQuery({
    ...v1ListProviderEndpointsOptions(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
}
