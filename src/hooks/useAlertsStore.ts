import { create } from "zustand";
import { AlertState } from "../types";

export const useAlertsStore = create<AlertState>((set) => ({
  alerts: [],
  filteredAlerts: [],
  loading: false,
  isMaliciousFilterActive: false,
  search: "",
  setSearch: (search: string) => {
    set({ search });
  },
  setIsMaliciousFilterActive: (isActive: boolean) => {
    set({
      isMaliciousFilterActive: isActive,
    });
  },
}));
