import { ListActiveWorkspacesResponse } from "@/api/generated";
import { useQueryListActiveWorkspaces } from "./use-query-list-active-workspaces";

// NOTE: This needs to be a stable function reference to enable memo-isation of
// the select operation on each React re-render.
function select(data: ListActiveWorkspacesResponse | undefined): string | null {
  return data?.workspaces?.[0]?.name ?? null;
}

export function useQueryActiveWorkspaceName() {
  return useQueryListActiveWorkspaces({
    select,
  });
}
