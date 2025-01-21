import { useActiveWorkspaces } from "./use-active-workspaces";

export function useActiveWorkspaceName() {
  return useActiveWorkspaces({
    select: (d) => d?.workspaces?.[0]?.name ?? null,
  });
}
