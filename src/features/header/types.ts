export type VersionResponse = {
  current_version: string
  latest_version: string
  is_latest: boolean | null
  error: string | null
} | null
