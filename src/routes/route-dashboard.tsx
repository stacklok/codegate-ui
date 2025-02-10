import { TableMessages } from "@/features/dashboard-messages/components/table-messages";
import { AlertsSummaryMaliciousPkg } from "@/features/dashboard-alerts/components/alerts-summary-malicious-pkg";
import { AlertsSummaryWorkspaceTokenUsage } from "@/features/dashboard-alerts/components/alerts-summary-workspace-token-usage";
import { AlertsSummaryMaliciousSecrets } from "@/features/dashboard-alerts/components/alerts-summary-secrets";
import { TabsMessages } from "@/features/dashboard-messages/components/tabs-messages";

export function RouteDashboard() {
  return (
    <div className="flex-col">
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-stretch gap-4 w-full mb-4">
        <AlertsSummaryMaliciousPkg />
        <AlertsSummaryMaliciousSecrets />
        <AlertsSummaryWorkspaceTokenUsage />
      </div>

      <TabsMessages>
        <TableMessages />
      </TabsMessages>
    </div>
  );
}
