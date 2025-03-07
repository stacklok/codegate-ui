import { useQuery } from '@tanstack/react-query'
import {
  V1GetWorkspaceMessagesData,
  V1GetWorkspaceMessagesResponse,
} from '@/api/generated'
import { v1GetWorkspaceMessagesOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryActiveWorkspaceName } from '@/hooks/use-query-active-workspace-name'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import { useMemo } from 'react'

export const useQueryGetWorkspaceMessages = <
  T = V1GetWorkspaceMessagesResponse,
>({
  select,
  query,
}: {
  select?: (data: V1GetWorkspaceMessagesResponse) => T
  query: V1GetWorkspaceMessagesData['query']
}) => {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()

  const options: V1GetWorkspaceMessagesData = useMemo(
    () => ({
      path: {
        workspace_name: activeWorkspaceName ?? 'default',
      },
      query,
    }),
    [activeWorkspaceName, query]
  )

  return useQuery({
    ...v1GetWorkspaceMessagesOptions(options),
    ...getQueryCacheConfig('5s'),
    select,
  })
}
