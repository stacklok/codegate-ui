import { Button } from "@stacklok/ui-kit";
import { ComponentProps } from "react";
import { useMutationArchiveWorkspace } from "@/features/workspace/hooks/use-mutation-archive-workspace";
import { useNavigate } from "react-router-dom";

export function useArchiveWorkspaceButton({
  workspaceName,
}: {
  workspaceName: string;
}): ComponentProps<typeof Button> {
  const { mutateAsync, isPending } = useMutationArchiveWorkspace();
  const navigate = useNavigate();

  return {
    isPending,
    isDisabled: isPending,
    onPress: () =>
      mutateAsync(
        { path: { workspace_name: workspaceName } },
        {
          onSuccess: () => navigate("/workspaces"),
        },
      ),
    isDestructive: true,
    children: "Archive",
  };
}
