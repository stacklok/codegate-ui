export type VersionResponse = {
  current_version: string;
  latest_version: string;
  is_latest: boolean | null;
  error: string | null;
} | null;

export const getVersionStatus = async (): Promise<VersionResponse | null> => {
  const resp = await fetch(
    new URL("/dashboard/version", import.meta.env.VITE_BASE_API_URL),
  );
  const data = (await resp.json()) as unknown as VersionResponse;

  return data;
};
