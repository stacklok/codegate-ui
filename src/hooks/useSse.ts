import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
        queryClient.invalidateQueries({ refetchType: "all" });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [location.pathname, queryClient]);
}
