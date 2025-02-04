import { v1ListProviderEndpointsQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateProvidersQueries() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: v1ListProviderEndpointsQueryKey(),
      refetchType: "all",
    });
  }, [queryClient]);

  return invalidate;
}
