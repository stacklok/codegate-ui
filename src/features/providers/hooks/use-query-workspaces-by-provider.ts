import { v1ListWorkspacesByProviderOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'

export function useQueryWorkspacesByProvider(
  providerId: string | undefined | null
) {
  if (!providerId) {
    throw new Error('providerId is required')
  }

  return useQuery({
    ...v1ListWorkspacesByProviderOptions({ path: { provider_id: providerId } }),
  })
}
