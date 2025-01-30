import { Separator } from "@stacklok/ui-kit";
import { TableAlerts } from "@/features/alerts/components/table-alerts";
import { AlertsSummaryMaliciousPkg } from "@/features/alerts/components/alerts-summary-malicious-pkg";
import { AlertsSummaryWorkspaceTokenUsage } from "@/features/alerts/components/alerts-summary-workspace-token-usage";
import { AlertsSummaryMaliciousSecrets } from "@/features/alerts/components/alerts-summary-secrets";

export function RouteDashboard() {
  return (
    <div className="flex-col">
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-stretch gap-4 w-full">
        <AlertsSummaryMaliciousPkg />
        <AlertsSummaryMaliciousSecrets />
        <AlertsSummaryWorkspaceTokenUsage />
      </div>

      <Separator className="my-8" />

      <TableAlerts />
    </div>
  );
}
