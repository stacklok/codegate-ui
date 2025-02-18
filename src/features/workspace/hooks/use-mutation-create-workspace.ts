import {
  v1CreateWorkspaceMutation,
  v1GetWorkspaceCustomInstructionsQueryKey,
  v1GetWorkspaceMuxesQueryKey,
  v1ListWorkspacesQueryKey,
  v1ListArchivedWorkspacesQueryKey,
  v1ListActiveWorkspacesQueryKey,
} from '@/api/generated/@tanstack/react-query.gen'
import { useInvalidateWorkspaceQueries } from './use-invalidate-workspace-queries'
import { useToastMutation } from '@/hooks/use-toast-mutation'
import { useQueryClient } from '@tanstack/react-query'
import { removeQueriesByIds } from '@/lib/react-query-utils'

export function useMutationCreateWorkspace() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateWorkspaceQueries()

  return useToastMutation({
    ...v1CreateWorkspaceMutation(),
    onSuccess: async () => {
      removeQueriesByIds({
        queryClient,
        queryKeyFns: [
          v1GetWorkspaceCustomInstructionsQueryKey,
          v1GetWorkspaceMuxesQueryKey,
          v1ListWorkspacesQueryKey,
          v1ListArchivedWorkspacesQueryKey,
          v1ListActiveWorkspacesQueryKey,
        ],
      })
      await invalidate()
    },
    successMsg: (variables) =>
      variables.body.rename_to
        ? `Renamed workspace to "${variables.body.rename_to}"`
        : `Created "${variables.body.name}" workspace`,
  })
}
