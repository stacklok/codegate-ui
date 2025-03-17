import { useQuery } from '@tanstack/react-query'
import { v1ListAllModelsForAllProvidersOptions } from '@/api/generated/@tanstack/react-query.gen'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import { V1ListAllModelsForAllProvidersResponse } from '@/api/generated'

export function useQueryListAllModelsForAllProviders<
  T = V1ListAllModelsForAllProvidersResponse,
>({
  select,
}: {
  select?: (data: V1ListAllModelsForAllProvidersResponse) => T
} = {}) {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    ...getQueryCacheConfig('no-cache'),
    // eslint-disable-next-line no-restricted-syntax
    refetchOnMount: true,
    select,
  })
}
