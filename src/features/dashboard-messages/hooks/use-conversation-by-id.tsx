import { useQueryGetWorkspaceMessages } from '@/hooks/use-query-get-workspace-messages'

export function useConversationById(id: string) {
  return useQueryGetWorkspaceMessages({
    query: {
      filter_by_ids: [id],
    },
    select: (d) => d.data[0],
  })
}
