import { v1ListWorkspacesOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'

export function useQueryWorkspacesByProvider(
  providerName: string | undefined | null
) {
  if (!providerName) {
    throw new Error('providerName is required')
  }

  return useQuery({
    ...v1ListWorkspacesOptions({ query: { provider_name: providerName } }),
    // eslint-disable-next-line no-restricted-syntax
    refetchOnMount: true,
  })
}
