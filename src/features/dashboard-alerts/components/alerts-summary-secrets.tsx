import { Key01 } from '@untitled-ui/icons-react'
import { AlertsSummary } from './alerts-summary'
import { useQueryGetWorkspaceAlertsSummary } from '@/hooks/use-query-get-workspace-alerts-summary'

export function AlertsSummaryMaliciousSecrets() {
  const { data: alertsSummary, isPending } = useQueryGetWorkspaceAlertsSummary()

  return (
    <AlertsSummary
      isPending={isPending}
      title="Secrets redacted"
      statistics={[
        {
          count: alertsSummary?.secrets ?? 0,
          id: 'secrets-count',
          Icon: Key01,
        },
      ]}
    />
  )
}
