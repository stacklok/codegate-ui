import { useQuery } from '@tanstack/react-query'
import { v1ListArchivedWorkspacesOptions } from '@/api/generated/@tanstack/react-query.gen'
import { V1ListArchivedWorkspacesResponse } from '@/api/generated'

export function useArchivedWorkspaces<T = V1ListArchivedWorkspacesResponse>({
  select,
}: {
  select?: (data: V1ListArchivedWorkspacesResponse) => T
} = {}) {
  return useQuery({
    ...v1ListArchivedWorkspacesOptions(),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    retry: false,
    select,
  })
}
