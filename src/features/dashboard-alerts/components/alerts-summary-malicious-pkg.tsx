import { PackageX } from '@untitled-ui/icons-react'

import { useQueryGetWorkspaceAlertsMaliciousPkg } from '../hooks/use-query-get-workspace-alerts-malicious-pkg'
import { AlertsSummary } from './alerts-summary'

export function AlertsSummaryMaliciousPkg() {
  const { data = [], isPending } = useQueryGetWorkspaceAlertsMaliciousPkg()

  return (
    <AlertsSummary
      isPending={isPending}
      title="Malicious packages"
      statistics={[
        { count: data.length, id: 'malicious-count', Icon: PackageX },
      ]}
    />
  )
}
