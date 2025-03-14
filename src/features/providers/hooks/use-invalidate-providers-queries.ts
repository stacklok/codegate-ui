import {
  v1ListAllModelsForAllProvidersQueryKey,
  v1ListProviderEndpointsQueryKey,
  v1ListWorkspacesByProviderQueryKey,
} from '@/api/generated/@tanstack/react-query.gen'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { invalidateQueries } from '../../../lib/react-query-utils'

export function useInvalidateProvidersQueries() {
  const queryClient = useQueryClient()

  const invalidate = useCallback(async () => {
    invalidateQueries(queryClient, [
      v1ListProviderEndpointsQueryKey,
      v1ListAllModelsForAllProvidersQueryKey,
      v1ListWorkspacesByProviderQueryKey,
    ])
  }, [queryClient])

  return invalidate
}
