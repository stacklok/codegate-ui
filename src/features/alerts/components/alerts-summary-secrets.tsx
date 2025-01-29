import { Key } from "lucide-react";
import { AlertsSummary } from "./alerts-summary";
import { useQueryGetWorkspaceAlertSecrets } from "../hooks/use-query-get-workspace-alerts-secrets";

export function AlertsSummaryMaliciousSecrets() {
  const { data = [], isPending } = useQueryGetWorkspaceAlertSecrets();

  return (
    <AlertsSummary
      isPending={isPending}
      title="Secrets redacted"
      statistics={[{ count: data.length, id: "secrets-count", Icon: Key }]}
    />
  );
}
