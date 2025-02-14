import { v1CreateWorkspaceMutation } from '@/api/generated/@tanstack/react-query.gen'
import { useInvalidateWorkspaceQueries } from './use-invalidate-workspace-queries'
import { useToastMutation } from '@/hooks/use-toast-mutation'

export function useMutationCreateWorkspace() {
  const invalidate = useInvalidateWorkspaceQueries()

  return useToastMutation({
    ...v1CreateWorkspaceMutation(),
    onSuccess: async () => {
      await invalidate()
    },
    successMsg: (variables) =>
      variables.body.rename_to
        ? `Renamed workspace to "${variables.body.rename_to}"`
        : `Created "${variables.body.name}" workspace`,
  })
}
