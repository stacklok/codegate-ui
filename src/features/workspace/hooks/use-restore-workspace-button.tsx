import { Button } from "@stacklok/ui-kit";
import { ComponentProps } from "react";
import { useRestoreWorkspace } from "./use-restore-workspace";

export function useRestoreWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string;
}): ComponentProps<typeof Button> {
  const { mutate, isPending } = useRestoreWorkspace();

  return {
    isPending,
    isDisabled: isPending,
    onPress: () => mutate({ path: { workspace_name: workspaceName } }),
    children: "Restore",
  };
}
