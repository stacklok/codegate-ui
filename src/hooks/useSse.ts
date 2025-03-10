import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  v1GetWorkspaceAlertsQueryKey,
  v1GetWorkspaceMessagesQueryKey,
} from '@/api/generated/@tanstack/react-query.gen'
import { invalidateQueries } from '@/lib/react-query-utils'
import { getAppConfig } from '@/lib/utils'

const baseApiUrl = getAppConfig().DASHBOARD_API_BASE_URL

export function useSse() {
  const location = useLocation()
  const queryClient = useQueryClient()

  useEffect(() => {
    const eventSource = new EventSource(
      `${baseApiUrl}/api/v1/alerts_notification`
    )

    eventSource.onmessage = function (event) {
      if (event.data.toLowerCase().includes('new alert detected')) {
        invalidateQueries(queryClient, [
          v1GetWorkspaceAlertsQueryKey,
          v1GetWorkspaceMessagesQueryKey,
        ])
      }
    }

    return () => {
      eventSource.close()
    }
  }, [location.pathname, queryClient])
}
