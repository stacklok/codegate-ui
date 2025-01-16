import { useQuery } from "@tanstack/react-query";
import { serverApi } from "@/api/service";
import { AlertConversation } from "@/api/generated";
import { getMaliciousPackage } from "@/lib/utils";
import { useAlertsStore } from "./useAlertsStore";
import { MaliciousPkgType, TriggerType } from "@/types";

const fetchAlerts = async (): Promise<AlertConversation[]> => {
  const { getAlertsDashboardAlertsGet } = await serverApi();
  const { data } = await getAlertsDashboardAlertsGet();

  return (data ?? [])
    .filter((alert): alert is AlertConversation => alert !== null)
    .filter((alert) => alert.trigger_category === "critical")
    .filter((alert) =>
      alert?.conversation.question_answers.every(
        (item) => item.answer && item.question,
      ),
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
};

export const useAlertsData = ({ ...args } = {}) => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: fetchAlerts,
    ...args,
  });
};

export const useFilteredAlerts = () => {
  const state = useAlertsData();
  const { search, isMaliciousFilterActive } = useAlertsStore();

  return {
    ...state,
    data:
      state.data !== undefined
        ? state.data
            .filter((alert) => {
              const maliciousPkg = getMaliciousPackage(alert.trigger_string);
              const maliciousPkgName =
                typeof maliciousPkg === "object"
                  ? maliciousPkg?.type
                  : maliciousPkg;

              const maliciousPkgType =
                typeof maliciousPkg === "object"
                  ? maliciousPkg?.name
                  : maliciousPkg;

              return (
                maliciousPkgName?.toLowerCase().includes(search) ||
                maliciousPkgType?.toLowerCase().includes(search) ||
                alert.trigger_type?.toLowerCase().includes(search)
              );
            })
            .filter((alert) => {
              if (!isMaliciousFilterActive) {
                return true;
              }

              return (
                typeof alert.trigger_string === "object" &&
                (alert.trigger_type as TriggerType) ===
                  "codegate-context-retriever"
              );
            })
        : undefined,
  };
};

export function useMaliciousPackagesChartData() {
  const { data: alerts = [] } = useAlertsData();

  return alerts
    .filter((item) => typeof item.trigger_string === "object")
    .filter((item) => item.trigger_type === "codegate-context-retriever")
    .map((item) => item.trigger_string as MaliciousPkgType);
}
