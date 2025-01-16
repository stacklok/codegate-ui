export type VersionResponse = {
  current_version: string;
  latest_version: string;
  is_latest: boolean | null;
  error: string | null;
} | null;

export const getVersionStatus = async (): Promise<VersionResponse | null> => {
  try {
    const resp = await fetch(
      new URL("/dashboard/version", import.meta.env.VITE_BASE_API_URL),
    );
    if (!resp.ok) return null;
    const data = (await resp.json()) as unknown as VersionResponse;
    if (data?.error) console.error(data.error);

    return data;
  } catch {
    return null;
  }
};
