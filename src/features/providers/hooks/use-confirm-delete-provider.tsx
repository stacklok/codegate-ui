import { useConfirm } from '@/hooks/use-confirm'
import { useCallback } from 'react'
import { useMutationDeleteProvider } from './use-mutation-delete-provider'
import { useQueryWorkspacesByProvider } from './use-query-workspaces-by-provider'
import { WorkspacesByProvider } from '../components/workspaces-by-provider'

export function useConfirmDeleteProvider(
  providerId: string | undefined | null
) {
  const { mutateAsync: deleteProvider } = useMutationDeleteProvider()
  const { data: workspaces } = useQueryWorkspacesByProvider(providerId)
  const { confirm } = useConfirm()

  return useCallback(
    async (...params: Parameters<typeof deleteProvider>) => {
      const answer = await confirm(
        <>
          <WorkspacesByProvider workspaces={workspaces} />
          <p>Are you sure you want to permanently delete this provider?</p>
        </>,
        {
          buttons: {
            yes: 'Delete',
            no: 'Cancel',
          },
          title: 'Permanently delete provider',
          isDestructive: true,
        }
      )
      if (answer) {
        return deleteProvider(...params)
      }
    },
    [confirm, deleteProvider, workspaces]
  )
}
