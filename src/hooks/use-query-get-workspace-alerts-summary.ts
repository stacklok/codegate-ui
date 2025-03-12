import { useQuery } from '@tanstack/react-query'
import { V1GetWorkspaceAlertsSummaryData } from '@/api/generated'
import { v1GetWorkspaceAlertsSummaryOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryActiveWorkspaceName } from '@/hooks/use-query-active-workspace-name'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import { useMemo } from 'react'

export const useQueryGetWorkspaceAlertsSummary = () => {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()

  const options: V1GetWorkspaceAlertsSummaryData = useMemo(
    () => ({
      path: {
        workspace_name: activeWorkspaceName ?? 'default',
      },
    }),
    [activeWorkspaceName]
  )

  return useQuery({
    ...v1GetWorkspaceAlertsSummaryOptions(options),
    ...getQueryCacheConfig('5s'),
  })
}
