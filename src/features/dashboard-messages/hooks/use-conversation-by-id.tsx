import { useQueryGetWorkspaceMessages } from '@/hooks/use-query-get-workspace-messages'

export function useConversationById(id: string) {
  return useQueryGetWorkspaceMessages({
    select: (d) => d.find((c) => c.chat_id === id),
  })
}
