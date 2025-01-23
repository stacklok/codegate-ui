import { Button } from "@stacklok/ui-kit";
import { ComponentProps } from "react";
import { useMutationArchiveWorkspace } from "@/features/workspace/hooks/use-mutation-archive-workspace";

export function useArchiveWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string;
}): ComponentProps<typeof Button> {
  const { mutateAsync, isPending } = useMutationArchiveWorkspace();

  return {
    isPending,
    isDisabled: isPending,
    onPress: () => mutateAsync({ path: { workspace_name: workspaceName } }),
    isDestructive: true,
    children: "Archive",
  };
}
