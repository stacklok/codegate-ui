import { Button } from '@stacklok/ui-kit'
import { ComponentProps } from 'react'
import { useMutationArchiveWorkspace } from '@/features/workspace/hooks/use-mutation-archive-workspace'
import { useQueryActiveWorkspaceName } from '../../../hooks/use-query-active-workspace-name'

export function useArchiveWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string
}): ComponentProps<typeof Button> {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()
  const { mutateAsync, isPending } = useMutationArchiveWorkspace()

  return {
    isPending,
    isDisabled:
      isPending ||
      workspaceName === activeWorkspaceName ||
      workspaceName === 'default',
    onPress: () => mutateAsync({ path: { workspace_name: workspaceName } }),
    isDestructive: true,
    children: 'Archive',
  }
}
