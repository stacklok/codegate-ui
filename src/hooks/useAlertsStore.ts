import { create } from "zustand";
import { AlertSearchState } from "../types";

export const useAlertsStore = create<AlertSearchState>((set) => ({
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
