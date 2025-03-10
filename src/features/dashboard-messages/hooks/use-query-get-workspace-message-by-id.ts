import { useQuery } from '@tanstack/react-query'
import {
  V1GetMessagesByPromptIdData,
  V1GetMessagesByPromptIdResponse,
} from '@/api/generated'
import { useQueryActiveWorkspaceName } from '@/hooks/use-query-active-workspace-name'
import { getQueryCacheConfig } from '@/lib/react-query-utils'
import { useMemo } from 'react'
import { v1GetMessagesByPromptIdOptions } from '@/api/generated/@tanstack/react-query.gen'

export const useQueryGetWorkspaceMessageById = <
  T = V1GetMessagesByPromptIdResponse,
>({
  id,
  select,
}: {
  id: string
  select?: (data: V1GetMessagesByPromptIdResponse) => T
}) => {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()

  const options: V1GetMessagesByPromptIdData = useMemo(
    () => ({
      path: {
        workspace_name: activeWorkspaceName ?? 'default',
        prompt_id: id,
      },
    }),
    [activeWorkspaceName, id]
  )

  return useQuery({
    ...v1GetMessagesByPromptIdOptions(options),
    ...getQueryCacheConfig('5s'),
    select,
  })
}
