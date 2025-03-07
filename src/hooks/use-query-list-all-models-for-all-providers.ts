import { useQuery } from '@tanstack/react-query'
import { v1ListAllModelsForAllProvidersOptions } from '@/api/generated/@tanstack/react-query.gen'
import { getQueryCacheConfig } from '@/lib/react-query-utils'

export const useQueryListAllModelsForAllProviders = () => {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    ...getQueryCacheConfig('no-cache'),
    // eslint-disable-next-line no-restricted-syntax
    refetchOnMount: true,
  })
}
