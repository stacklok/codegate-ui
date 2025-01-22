import { Button } from "@stacklok/ui-kit";
import { ComponentProps } from "react";
import { useArchiveWorkspace } from "@/features/workspace-system-prompt/hooks/use-archive-workspace";

export function useArchiveWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string;
}): ComponentProps<typeof Button> {
  const { mutate, isPending } = useArchiveWorkspace();

  return {
    isPending,
    isDisabled: isPending,
    onPress: () => mutate({ path: { workspace_name: workspaceName } }),
    isDestructive: true,
    children: "Archive",
  };
}
