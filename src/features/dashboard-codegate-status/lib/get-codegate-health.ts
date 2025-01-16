export enum HealthStatus {
  HEALTHY = "Healthy",
  UNHEALTHY = "Unhealthy",
}

type HealthResponse = { status: "healthy" | unknown } | null;

export const getCodeGateHealth = async (): Promise<HealthStatus | null> => {
  const resp = await fetch(
    new URL("/health", import.meta.env.VITE_BASE_API_URL),
  );
  const data = (await resp.json()) as unknown as HealthResponse;

  if (data?.status === "healthy") return HealthStatus.HEALTHY;
  if (data?.status !== "healthy") return HealthStatus.UNHEALTHY;

  return null;
};
