import { create } from "zustand";
import { AlertSearchState } from "../types";

export const useAlertSearch = create<AlertSearchState>((set) => ({
  isMaliciousFilterActive: false,
  search: "",
  setSearch: (search: string) => {
    set({ search, page: 0 });
  },
  setIsMaliciousFilterActive: (isActive: boolean) => {
    set({
      isMaliciousFilterActive: isActive,
      page: 0,
    });
  },
  page: 0,
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }));
  },
  prevPage: () => {
    set((state) => ({ page: state.page - 1 }));
  },
}));
