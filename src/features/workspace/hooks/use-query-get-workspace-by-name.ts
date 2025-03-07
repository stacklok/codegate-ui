import { v1GetWorkspaceByNameOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'

export function useQueryGetWorkspaceByName(options: {
  path: {
    workspace_name: string
  }
}) {
  return useQuery({
    ...v1GetWorkspaceByNameOptions(options),
  })
}
