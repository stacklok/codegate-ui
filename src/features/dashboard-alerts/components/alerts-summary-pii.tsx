import { User01 } from '@untitled-ui/icons-react'
import { AlertsSummary } from './alerts-summary'
import { useQueryGetWorkspaceAlertsSummary } from '@/hooks/use-query-get-workspace-alerts-summary'

export function AlertsSummaryPii() {
  const { data: alertsSummary, isPending } = useQueryGetWorkspaceAlertsSummary()

  return (
    <AlertsSummary
      isPending={isPending}
      title="PII redacted"
      statistics={[
        {
          count: alertsSummary?.pii ?? 0,
          id: 'pii-count',
          Icon: User01,
        },
      ]}
    />
  )
}
