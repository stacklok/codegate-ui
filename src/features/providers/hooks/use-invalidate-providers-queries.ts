import { v1ListProviderEndpointsQueryKey } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { invalidateQueries } from '../../../lib/react-query-utils'

export function useInvalidateProvidersQueries() {
  const queryClient = useQueryClient()

  const invalidate = useCallback(async () => {
    invalidateQueries(queryClient, [v1ListProviderEndpointsQueryKey])
  }, [queryClient])

  return invalidate
}
