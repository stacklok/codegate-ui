import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useInvalidateProvidersQueries } from "./use-invalidate-providers-queries";
import { v1DeleteProviderEndpointMutation } from "@/api/generated/@tanstack/react-query.gen";

export const useMutationDeleteProvider = () => {
  const invalidate = useInvalidateProvidersQueries();

  return useToastMutation({
    ...v1DeleteProviderEndpointMutation(),
    onSuccess: () => invalidate(),
    successMsg: () => "Successfully deleted provider",
  });
};
