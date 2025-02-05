import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Query, useQueryClient } from "@tanstack/react-query";
import { OpenApiTsReactQueryKey } from "@/types/openapi-ts";
import {
  v1GetWorkspaceAlertsQueryKey,
  v1GetWorkspaceMessagesQueryKey,
} from "@/api/generated/@tanstack/react-query.gen";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function useSse() {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(
      `${BASE_URL}/api/v1/alerts_notification`,
    );

    eventSource.onmessage = function (event) {
      if (event.data.toLowerCase().includes("new alert detected")) {
        queryClient.invalidateQueries({
          refetchType: "all",
          predicate: (
            query: Query<unknown, Error, unknown, OpenApiTsReactQueryKey>,
          ) =>
            query.queryKey[0]._id ===
              v1GetWorkspaceAlertsQueryKey({
                path: { workspace_name: "default" }, // NOTE: Just supplying "default" to satisfy the type-checker, because we are just using the `_id`, this invalidates for any workspace
              })[0]?._id ||
            query.queryKey[0]._id ===
              v1GetWorkspaceMessagesQueryKey({
                path: { workspace_name: "default" }, // NOTE: Just supplying "default" to satisfy the type-checker, because we are just using the `_id`, this invalidates for any workspace
              })[0]?._id,
        });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [location.pathname, queryClient]);
}
