import { ListActiveWorkspacesResponse } from "@/api/generated";
import { useActiveWorkspaces } from "./use-active-workspaces";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render.
function select(data: ListActiveWorkspacesResponse | undefined): string | null {
  return data?.workspaces?.[0]?.name ?? null;
}

export function useActiveWorkspaceName() {
  return useActiveWorkspaces({
    select,
  });
}
