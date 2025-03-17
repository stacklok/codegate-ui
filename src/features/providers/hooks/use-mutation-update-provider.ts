import { useToastMutation } from '@/hooks/use-toast-mutation'
import { useNavigate } from 'react-router-dom'
import { useInvalidateProvidersQueries } from './use-invalidate-providers-queries'
import {
  AddProviderEndpointRequest,
  ProviderAuthType,
  v1ConfigureAuthMaterial,
  v1UpdateProviderEndpoint,
} from '@/api/generated'

export function useMutationUpdateProvider() {
  const navigate = useNavigate()
  const invalidate = useInvalidateProvidersQueries()

  const mutationFn = async ({
    api_key,
    oldName,
    ...rest
  }: AddProviderEndpointRequest & { oldName: string }) => {
    const updateProviderPromise = v1UpdateProviderEndpoint({
      path: { provider_name: oldName },
      body: rest,
    })

    // don't update the api key if it's not updated
    if (!api_key && rest.auth_type === ProviderAuthType.API_KEY) {
      return updateProviderPromise
    }

    const updateApiKey = v1ConfigureAuthMaterial({
      path: { provider_name: oldName },
      body: {
        api_key: rest.auth_type === ProviderAuthType.API_KEY ? api_key : null,
        auth_type: rest.auth_type as ProviderAuthType,
      },
      throwOnError: true,
    })

    return Promise.all([updateApiKey, updateProviderPromise])
  }

  return useToastMutation({
    mutationFn,
    successMsg: 'Successfully updated provider',
    onSuccess: async () => {
      await invalidate()
      navigate('/providers')
    },
  })
}
