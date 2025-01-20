import { queryOptions, useQuery } from "@tanstack/react-query";

import {
  PollingInterval,
  POLLING_INTERVAl,
} from "../components/codegate-status-polling-control";
import { healthCheckHealthGet, v1VersionCheck } from "@/api/generated";
import { HealthStatus, VersionResponse } from "../types";

type HealthResponse = { status: "healthy" | unknown } | null;

const getCodeGateHealth = async (): Promise<HealthStatus | null> => {
  const data = (await healthCheckHealthGet()).data;

  if ((data as HealthResponse)?.status === "healthy")
    return HealthStatus.HEALTHY;
  if ((data as HealthResponse)?.status !== "healthy")
    return HealthStatus.UNHEALTHY;

  return null;
};

const getVersion = async (): Promise<VersionResponse | null> => {
  return ((await v1VersionCheck()).data as VersionResponse) ?? null;
};

export function getQueryOptionsCodeGateStatus(
  pollingInterval: PollingInterval,
) {
  return queryOptions({
    queryFn: async () => {
      const health = await getCodeGateHealth();
      const version = await getVersion();

      return {
        health,
        version: version as VersionResponse | null,
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
