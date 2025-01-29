import { Separator } from "@stacklok/ui-kit";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAlertsData } from "@/hooks/useAlertsData";
import { useAlertSearch } from "@/hooks/useAlertSearch";
import { TableAlerts } from "@/features/alerts/components/table-alerts";
import { AlertsSummaryMaliciousPkg } from "@/features/alerts/components/alerts-summary-malicious-pkg";
import { AlertsSummaryWorkspaceTokenUsage } from "@/features/alerts/components/alerts-summary-workspace-token-usage";
import { AlertsSummaryMaliciousSecrets } from "@/features/alerts/components/alerts-summary-secrets";

export function RouteDashboard() {
  const [searchParams] = useSearchParams();

  const { setIsMaliciousFilterActive, setSearch } = useAlertSearch();

  const { data: alerts = [] } = useAlertsData();

  useEffect(() => {
    const isMaliciousFilterActive = searchParams.get("maliciousPkg") === "true";
    const searchFilterParam = searchParams.get("search");
    if (isMaliciousFilterActive && alerts.length > 0) {
      setIsMaliciousFilterActive(true);
    }
    if (searchFilterParam && alerts.length > 0) {
      setSearch(searchFilterParam);
    }
  }, [searchParams, setIsMaliciousFilterActive, setSearch, alerts]);

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
