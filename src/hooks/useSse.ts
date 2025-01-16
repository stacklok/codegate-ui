import { useEffect } from "react";
import { useBrowserNotification } from "./useBrowserNotification";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function useSse() {
  const location = useLocation();
  const { sendNotification } = useBrowserNotification();
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(
      `${BASE_URL}/dashboard/alerts_notification`,
    );

    eventSource.onmessage = function (event) {
      queryClient.invalidateQueries({ refetchType: "all" });
      if (event.data.toLowerCase().includes("new alert detected")) {
        sendNotification("CodeGate Dashboard", {
          body: "New Alert detected!",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [location.pathname, queryClient, sendNotification]);
}
