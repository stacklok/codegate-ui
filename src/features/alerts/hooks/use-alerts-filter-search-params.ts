import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export enum AlertsFilterView {
  ALL = "all",
  MALICIOUS = "malicious",
  SECRETS = "secrets",
}

const alertsFilterSchema = z.object({
  search: z.string().optional(),
  view: z.nativeEnum(AlertsFilterView),
});

type AlertsFilterSchema = z.output<typeof alertsFilterSchema>;

const DEFAULT_FILTER: AlertsFilterSchema = {
  view: AlertsFilterView.ALL,
};

export const useAlertsFilterSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(DEFAULT_FILTER),
  );

  const setView = useCallback(
    (view: AlertsFilterView) => {
      setSearchParams((prev) => {
        if (view) prev.set("view", view);
        if (!view) prev.delete("view");
        return prev;
      });
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (query: string | null) => {
      setSearchParams((prev) => {
        if (query !== null) prev.set("search", query);
        if (query == null || query === "") prev.delete("search");
        return prev;
      });
    },
    [setSearchParams],
  );

  const state = alertsFilterSchema.parse(Object.fromEntries(searchParams));

  return { state, setView, setSearch };
};
