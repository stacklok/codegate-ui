import { useQueries } from '@tanstack/react-query'

import {
  HealthCheckHealthGetResponse,
  V1VersionCheckResponse,
} from '@/api/generated'
import { VersionResponse } from '../types'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import {
  healthCheckHealthGetOptions,
  v1VersionCheckOptions,
} from '@/api/generated/@tanstack/react-query.gen'
import { QueryResult } from '@/types/react-query'

type UseQueryReturn = [
  QueryResult<HealthCheckHealthGetResponse>,
  QueryResult<V1VersionCheckResponse>,
]

const combine = (results: UseQueryReturn) => {
  const [health, version] = results

  return {
    data: {
      health: health.data as { status: 'healthy' } | null,
      version: version.data as VersionResponse | null,
    },
    isError: results.some((r) => r.isError),
    isPending: results.some((r) => r.isPending),
    isFetching: results.some((r) => r.isFetching),
    isLoading: results.some((r) => r.isLoading),
    isRefetching: results.some((r) => r.isRefetching),
  }
}

export const useQueriesCodegateStatus = () => {
  return useQueries({
    combine,
    queries: [
      {
        ...healthCheckHealthGetOptions(),
        refetchInterval: 60_000,
        refetchIntervalInBackground: true,
        retry: false,
        ...getQueryCacheConfig('indefinite'),
      },
      {
        ...v1VersionCheckOptions(),
        refetchInterval: 60_000,
        refetchIntervalInBackground: true,
        retry: false,
        ...getQueryCacheConfig('indefinite'),
      },
    ],
  })
}
