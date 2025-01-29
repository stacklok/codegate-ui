import { Separator } from "@stacklok/ui-kit";
import { useEffect } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";
import { PieChart } from "@/viz/PieChart";
import { useSearchParams } from "react-router-dom";
import {
  useAlertsData,
  useMaliciousPackagesChartData,
} from "@/hooks/useAlertsData";
import { useAlertSearch } from "@/hooks/useAlertSearch";
import { AlertsTable } from "@/components/AlertsTable";

export function RouteDashboard() {
  const [searchParams] = useSearchParams();

  const { setIsMaliciousFilterActive, setSearch } = useAlertSearch();

  const { data: alerts = [], isLoading } = useAlertsData();

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

  const maliciousPackages = useMaliciousPackagesChartData();

  return (
    <div className="flex-col">
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-stretch gap-4 w-full">
        <BarChart data={alerts} loading={isLoading} />
        <PieChart data={maliciousPackages} loading={isLoading} />
        <LineChart data={alerts} loading={isLoading} />
      </div>

      <Separator className="my-8" />

      <AlertsTable />
    </div>
  );
}
