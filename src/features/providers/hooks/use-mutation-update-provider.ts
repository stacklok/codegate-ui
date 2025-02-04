import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useNavigate } from "react-router-dom";
import { useInvalidateProvidersQueries } from "./use-invalidate-providers-queries";
import {
  AddProviderEndpointRequest,
  ProviderAuthType,
  v1ConfigureAuthMaterial,
  v1UpdateProviderEndpoint,
} from "@/api/generated";

export function useMutationUpdateProvider() {
  const navigate = useNavigate();
  const invalidate = useInvalidateProvidersQueries();

  const mutationFn = ({ api_key, ...rest }: AddProviderEndpointRequest) => {
    return Promise.all([
      v1ConfigureAuthMaterial({
        path: { provider_id: rest.id as string },
        body: {
          api_key: api_key,
          auth_type: rest.auth_type as ProviderAuthType,
        },
        throwOnError: true,
      }),

      v1UpdateProviderEndpoint({
        path: { provider_id: rest.id as string },
        body: rest,
      }),
    ]);
  };

  return useToastMutation({
    mutationFn,
    successMsg: "Successfully update provider",
    onSuccess: async () => {
      await invalidate();
      navigate("/providers");
    },
  });
}
