import {
  v1GetWorkspaceCustomInstructionsQueryKey,
  v1GetWorkspaceMuxesQueryKey,
  v1UpdateWorkspaceMutation,
} from '@/api/generated/@tanstack/react-query.gen'
import { useInvalidateWorkspaceQueries } from './use-invalidate-workspace-queries'
import { useToastMutation } from '@/hooks/use-toast-mutation'
import { useQueryClient } from '@tanstack/react-query'
import { removeQueriesByIds } from '@/lib/react-query-utils'

export function useMutationUpdateWorkspace() {
  const queryClient = useQueryClient()
  const invalidate = useInvalidateWorkspaceQueries()

  return useToastMutation({
    ...v1UpdateWorkspaceMutation(),
    onSuccess: async () => {
      removeQueriesByIds({
        queryClient,
        queryKeyFns: [
          v1GetWorkspaceMuxesQueryKey,
          v1GetWorkspaceCustomInstructionsQueryKey,
        ],
      })
      await invalidate()
    },
    successMsg: 'Updated workspace',
  })
}
