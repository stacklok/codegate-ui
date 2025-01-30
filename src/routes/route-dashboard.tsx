import { TableAlerts } from "@/features/alerts/components/table-alerts";
import { AlertsSummaryMaliciousPkg } from "@/features/alerts/components/alerts-summary-malicious-pkg";
import { AlertsSummaryWorkspaceTokenUsage } from "@/features/alerts/components/alerts-summary-workspace-token-usage";
import { AlertsSummaryMaliciousSecrets } from "@/features/alerts/components/alerts-summary-secrets";
import { TabsAlerts } from "@/features/alerts/components/tabs-alerts";

export function RouteDashboard() {
  return (
    <div className="flex-col">
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-stretch gap-4 w-full mb-4">
        <AlertsSummaryMaliciousPkg />
        <AlertsSummaryMaliciousSecrets />
        <AlertsSummaryWorkspaceTokenUsage />
      </div>

      <TabsAlerts>
        <TableAlerts />
      </TabsAlerts>
    </div>
  );
}
