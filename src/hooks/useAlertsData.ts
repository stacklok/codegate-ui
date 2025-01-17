import { useQuery } from "@tanstack/react-query";
import {
  AlertConversation,
  getAlertsDashboardAlertsGet,
} from "@/api/generated";
import { getMaliciousPackage } from "@/lib/utils";
import { MaliciousPkgType, TriggerType } from "@/types";
import { useAlertSearch } from "./useAlertSearch";
import { getAlertsDashboardAlertsGetQueryKey } from "@/api/generated/@tanstack/react-query.gen";

const fetchAlerts = async (): Promise<AlertConversation[]> => {
  const { data } = await getAlertsDashboardAlertsGet();

  const results = (data ?? [])
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

  return results;
};

export const useAlertsData = ({ ...args } = {}) => {
  return useQuery({
    queryKey: getAlertsDashboardAlertsGetQueryKey(),
    queryFn: fetchAlerts,
    ...args,
  });
};

const PAGE_SIZE = 15;

export const useFilteredAlerts = () => {
  const { isMaliciousFilterActive, search, page } = useAlertSearch();

  const page_start = page * PAGE_SIZE;

  return useAlertsData({
    select: (
      data: Exclude<ReturnType<typeof useAlertsData>["data"], undefined>,
    ) =>
      data
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
            (alert.trigger_type as TriggerType) === "codegate-context-retriever"
          );
        })
        .slice(page_start, page_start + PAGE_SIZE - 1),
  });
};

export function useMaliciousPackagesChartData() {
  const { data: alerts = [] } = useAlertsData();

  return alerts
    .filter((item) => typeof item.trigger_string === "object")
    .filter((item) => item.trigger_type === "codegate-context-retriever")
    .map((item) => item.trigger_string as MaliciousPkgType);
}
