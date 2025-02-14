import { v1AddProviderEndpointMutation } from '@/api/generated/@tanstack/react-query.gen'
import { useToastMutation } from '@/hooks/use-toast-mutation'
import { useInvalidateProvidersQueries } from './use-invalidate-providers-queries'
import { useNavigate } from 'react-router-dom'

export function useMutationCreateProvider() {
  const navigate = useNavigate()
  const invalidate = useInvalidateProvidersQueries()
  return useToastMutation({
    ...v1AddProviderEndpointMutation(),
    successMsg: 'Successfully added provider',
    onSuccess: async () => {
      await invalidate()
      navigate('/providers')
    },
  })
}
