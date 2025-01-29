import { Box } from "lucide-react";
import { AlertsSummary } from "./alerts-summary";
import { useQueryGetWorkspaceAlertsMaliciousPkg } from "../hooks/use-query-get-workspace-alerts-malicious-pkg";

export function AlertsSummaryMaliciousPkg() {
  const { data = [], isPending } = useQueryGetWorkspaceAlertsMaliciousPkg();

  return (
    <AlertsSummary
      isPending={isPending}
      title="Malicious packages"
      statistics={[{ count: data.length, id: "malicious-count", Icon: Box }]}
    />
  );
}
