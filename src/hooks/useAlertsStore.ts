import { create } from "zustand";
import { AlertState, MaliciousPkgType, TriggerType } from "../types";
import { serverApi } from "@/api/service";
import { AlertConversation } from "@/api/generated/types.gen";
import { getMaliciousPackage } from "@/lib/utils";

export const useAlertsStore = create<AlertState>((set, get) => ({
  alerts: [],
  filteredAlerts: [],
  loading: false,
  isMaliciousFilterActive: false,
  search: "",
  fetchAlerts: async () => {
    set({ loading: true });
    const { getAlertsDashboardAlertsGet } = await serverApi();
    const { data } = await getAlertsDashboardAlertsGet();
    if (data !== undefined) {
      const alerts = data
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

      set({
        alerts: [...alerts],
        loading: false,
      });
    } else {
      set({ alerts: [], loading: false });
    }

    get().updateFilteredAlerts();
  },
  setSearch: (search: string) => {
    set({ search });
    get().updateFilteredAlerts();
  },
  toggleMaliciousFilter: (isActive: boolean) => {
    const { alerts } = get();
    set({
      isMaliciousFilterActive: isActive,
    });

    const filteredAlerts = isActive
      ? alerts
          .filter((item) => typeof item.trigger_string === "object")
          .filter(
            (item) =>
              (item.trigger_type as TriggerType) ===
              "codegate-context-retriever",
          )
      : alerts;

    set({
      filteredAlerts: [...filteredAlerts],
    });
  },
  updateFilteredAlerts: () => {
    const { alerts, search } = get();
    const filteredAlerts = search
      ? alerts.filter((alert) => {
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
      : alerts;

    set({
      filteredAlerts: [...filteredAlerts],
    });
  },
  getMaliciousPackagesChart: () => {
    const { alerts } = get();
    return alerts
      .filter((item) => typeof item.trigger_string === "object")
      .filter((item) => item.trigger_type === "codegate-context-retriever")
      .map((item) => item.trigger_string as MaliciousPkgType);
  },
}));
