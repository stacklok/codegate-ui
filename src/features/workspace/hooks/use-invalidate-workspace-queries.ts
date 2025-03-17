import {
  v1GetWorkspaceByNameQueryKey,
  v1GetWorkspaceMuxesQueryKey,
  v1ListArchivedWorkspacesQueryKey,
  v1ListWorkspacesQueryKey,
} from '@/api/generated/@tanstack/react-query.gen'
import { invalidateQueries } from '@/lib/react-query-utils'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useInvalidateWorkspaceQueries() {
  const queryClient = useQueryClient()

  const invalidate = useCallback(async () => {
    invalidateQueries(queryClient, [
      v1ListWorkspacesQueryKey,
      v1ListArchivedWorkspacesQueryKey,
      v1GetWorkspaceMuxesQueryKey,
      v1GetWorkspaceByNameQueryKey,
    ])
  }, [queryClient])

  return invalidate
}
