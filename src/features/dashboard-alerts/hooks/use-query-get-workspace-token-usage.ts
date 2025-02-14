import {
  V1GetWorkspaceTokenUsageData,
  V1GetWorkspaceTokenUsageResponse,
} from '@/api/generated'
import { v1GetWorkspaceTokenUsageOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryActiveWorkspaceName } from '@/hooks/use-query-active-workspace-name'
import { useQuery } from '@tanstack/react-query'

export function useQueryGetWorkspaceTokenUsage<
  T = V1GetWorkspaceTokenUsageResponse,
>({
  select,
}: {
  select?: (data: V1GetWorkspaceTokenUsageResponse) => T
} = {}) {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()

  const options: V1GetWorkspaceTokenUsageData = {
    path: {
      workspace_name: activeWorkspaceName ?? 'default',
    },
  }

  return useQuery({
    ...v1GetWorkspaceTokenUsageOptions(options),
    select,
  })
}
