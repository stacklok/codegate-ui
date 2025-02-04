import {
  v1ConfigureAuthMaterialMutation,
  v1UpdateProviderEndpointMutation,
} from "@/api/generated/@tanstack/react-query.gen";
import { useToastMutation } from "@/hooks/use-toast-mutation";
import { useNavigate } from "react-router-dom";
import { useInvalidateProvidersQueries } from "./use-invalidate-providers-queries";

// export function useMutationUpdateProvider() {
//   return useToastMutation({
//     mutationFn: async (provider) => {
//       console.log(provider);
//       v1ConfigureAuthMaterialMutation();
//       v1UpdateProviderEndpointMutation();

//       return;
//     },
//     successMsg: () => {
//       return "cioenn";
//     },
//   });
// }

// const mutationProvider = useMutation({
//   ...v1UpdateProviderEndpointMutation(),
// });

// if (mutationAuthMaterial.isSuccess && mutationProvider.isSuccess) {
//   toast.success("sdkasdjk");
// }

// if (mutationAuthMaterial.isError && mutationProvider.isError) {
//   toast.error("sdkasdjk");
// }

// return { mutationAuthMaterial, mutationProvider };

export function useMutationUpdateProvider() {
  const navigate = useNavigate();
  const invalidate = useInvalidateProvidersQueries();

  const mutationFn = async () => {
    const configureAuthMaterialMutation = v1ConfigureAuthMaterialMutation();
    const updateProviderEndpointMutation = v1UpdateProviderEndpointMutation();

    return { configureAuthMaterialMutation, updateProviderEndpointMutation };
  };

  return useToastMutation({
    mutationFn,
    successMsg: "Success",
    errorMsg: "error",
    onSuccess: async () => {
      await invalidate();
      navigate("/providers");
    },
  });
}
