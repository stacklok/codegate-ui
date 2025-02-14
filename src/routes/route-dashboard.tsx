import { TableMessages } from '@/features/dashboard-messages/components/table-messages'
import { AlertsSummaryMaliciousPkg } from '@/features/dashboard-alerts/components/alerts-summary-malicious-pkg'
import { AlertsSummaryWorkspaceTokenUsage } from '@/features/dashboard-alerts/components/alerts-summary-workspace-token-usage'
import { AlertsSummaryMaliciousSecrets } from '@/features/dashboard-alerts/components/alerts-summary-secrets'
import { TabsMessages } from '@/features/dashboard-messages/components/tabs-messages'
import { PageContainer } from '@/components/page-container'

export function RouteDashboard() {
  return (
    <PageContainer>
      <div className="mb-4 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-3 2xl:grid-cols-3">
        <AlertsSummaryMaliciousPkg />
        <AlertsSummaryMaliciousSecrets />
        <AlertsSummaryWorkspaceTokenUsage />
      </div>

      <TabsMessages>
        <TableMessages />
      </TabsMessages>
    </PageContainer>
  )
}
