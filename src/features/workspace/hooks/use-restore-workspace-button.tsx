import { Button } from "@stacklok/ui-kit";
import { ComponentProps } from "react";
import { useMutationRestoreWorkspace } from "./use-mutation-restore-workspace";

export function useRestoreWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string;
}): ComponentProps<typeof Button> {
  const { mutateAsync, isPending } = useMutationRestoreWorkspace();

  return {
    isPending,
    isDisabled: isPending,
    onPress: () => mutateAsync({ path: { workspace_name: workspaceName } }),
    children: "Restore",
  };
}
