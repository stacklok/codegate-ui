import { useQuery } from '@tanstack/react-query'
import { v1ListAllModelsForAllProvidersOptions } from '@/api/generated/@tanstack/react-query.gen'
import { V1ListAllModelsForAllProvidersResponse } from '@/api/generated/types.gen'

export function useQueryListAllModelsForAllProviders<
  T = V1ListAllModelsForAllProvidersResponse,
>({
  select,
}: {
  select?: (data: V1ListAllModelsForAllProvidersResponse) => T
} = {}) {
  return useQuery({
    ...v1ListAllModelsForAllProvidersOptions(),
    select,
  })
}
