import { useConfirm } from '@/hooks/use-confirm'
import { useCallback } from 'react'
import { useMutationHardDeleteWorkspace } from './use-mutation-hard-delete-workspace'

export function useConfirmHardDeleteWorkspace() {
  const { mutateAsync: hardDeleteWorkspace } = useMutationHardDeleteWorkspace()

  const { confirm } = useConfirm()

  return useCallback(
    async (...params: Parameters<typeof hardDeleteWorkspace>) => {
      const answer = await confirm(
        <>
          <p className="mb-1">
            Are you sure you want to permanently delete this workspace?
          </p>
          <p>
            You will lose all configuration and data associated with this
            workspace, like prompt history or alerts.
          </p>
        </>,
        {
          buttons: {
            yes: 'Delete',
            no: 'Cancel',
          },
          title: 'Permanently delete workspace',
          isDestructive: true,
        }
      )
      if (answer) {
        return hardDeleteWorkspace(...params)
      }
    },
    [confirm, hardDeleteWorkspace]
  )
}
