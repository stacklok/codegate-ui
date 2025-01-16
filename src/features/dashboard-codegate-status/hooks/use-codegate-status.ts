import { queryOptions, useQuery } from "@tanstack/react-query";

import { getCodeGateHealth } from "../lib/get-codegate-health";
import { getVersionStatus } from "../lib/get-version-status";
import {
  PollingInterval,
  POLLING_INTERVAl,
} from "../components/codegate-status-polling-control";

export function getQueryOptionsCodeGateStatus(
  pollingInterval: PollingInterval,
) {
  return queryOptions({
    queryFn: async () => {
      const health = await getCodeGateHealth();
      const version = await getVersionStatus();

      return {
        health,
        version,
      };
    },
    queryKey: ["useHealthCheck", { pollingInterval }],
    refetchInterval: POLLING_INTERVAl[pollingInterval].value,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
}

export const useCodeGateStatus = (pollingInterval: PollingInterval) =>
  useQuery({
    ...getQueryOptionsCodeGateStatus(pollingInterval),
  });
