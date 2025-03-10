import { useMessagesFilterSearchParams } from './use-messages-filter-search-params'
import { useQueryGetWorkspaceMessages } from '@/hooks/use-query-get-workspace-messages'

export function useQueryGetWorkspaceMessagesTable() {
  const { state } = useMessagesFilterSearchParams()

  return useQueryGetWorkspaceMessages({
    query: {
      page: state.page,
      page_size: 20,
      filter_by_alert_trigger_types:
        state.view === 'all' || state.view == null ? undefined : [state.view],
    },
  })
}
