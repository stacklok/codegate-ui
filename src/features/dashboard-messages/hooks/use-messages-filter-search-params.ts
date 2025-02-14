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
  view: z.nativeEnum(AlertsFilterView).optional().default(AlertsFilterView.ALL),
  page: z.coerce.number().optional().default(0),
});

type AlertsFilterSchema = z.input<typeof alertsFilterSchema>;

const DEFAULT_FILTER = {
  view: AlertsFilterView.ALL,
} as const satisfies AlertsFilterSchema;

export const useMessagesFilterSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(DEFAULT_FILTER),
  );

  const setView = useCallback(
    (view: AlertsFilterView) => {
      setSearchParams((prev) => {
        if (view) prev.set("view", view);
        if (!view) prev.delete("view");

        prev.delete("page");
        return prev;
      });
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (query: string | null) => {
      setSearchParams((prev) => {
        if (query !== null && query !== "") {
          prev.set("search", query);
          prev.delete("page");
        } else {
          prev.delete("search");
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  const nextPage = useCallback(() => {
    setSearchParams((prev) => {
      const page = Number(prev.get("page") ?? 0);
      prev.set("page", (page + 1).toString());
      return prev;
    });
  }, [setSearchParams]);

  const prevPage = useCallback(() => {
    setSearchParams((prev) => {
      const page = Number(prev.get("page") ?? 0);
      prev.set("page", (page - 1).toString());
      return prev;
    });
  }, [setSearchParams]);

  const state = alertsFilterSchema.parse(Object.fromEntries(searchParams));

  return { state, setView, setSearch, nextPage, prevPage };
};
