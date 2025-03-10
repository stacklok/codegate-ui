import { PackageX } from '@untitled-ui/icons-react'

import { AlertsSummary } from './alerts-summary'
import { useQueryGetWorkspaceAlertsSummary } from '@/hooks/use-query-get-workspace-alerts-summary'

export function AlertsSummaryMaliciousPkg() {
  const { data: alertsSummary, isPending } = useQueryGetWorkspaceAlertsSummary()

  return (
    <AlertsSummary
      isPending={isPending}
      title="Malicious packages"
      statistics={[
        {
          count: alertsSummary?.malicious_packages ?? 0,
          id: 'malicious-count',
          Icon: PackageX,
        },
      ]}
    />
  )
}
