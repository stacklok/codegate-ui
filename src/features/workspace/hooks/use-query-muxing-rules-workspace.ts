import { V1GetWorkspaceMuxesData } from '@/api/generated'
import { v1GetWorkspaceMuxesOptions } from '@/api/generated/@tanstack/react-query.gen'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useQueryMuxingRulesWorkspace = (workspace_name: string) => {
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, 'body'> = useMemo(
    () => ({
      path: { workspace_name },
    }),
    [workspace_name]
  )

  const { data = [], ...rest } = useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
    ...getQueryCacheConfig('no-cache'),
    // eslint-disable-next-line no-restricted-syntax
    refetchOnMount: true,
  })

  return { data: data, ...rest }
}
