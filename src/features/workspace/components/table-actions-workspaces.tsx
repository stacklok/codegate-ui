import { Workspace } from "@/api/generated";
import {
  Button,
  Menu,
  MenuTrigger,
  OptionsSchema,
  Popover,
} from "@stacklok/ui-kit";

import { Undo2, X, SlidersHorizontal, Check, Ellipsis } from "lucide-react";
import { useMutationArchiveWorkspace } from "@/features/workspace/hooks/use-mutation-archive-workspace";
import { useMutationRestoreWorkspace } from "../hooks/use-mutation-restore-workspace";
import { useMutationHardDeleteWorkspace } from "../hooks/use-mutation-hard-delete-workspace";
import { useMutationActivateWorkspace } from "../hooks/use-mutation-activate-workspace";
import { useConfirmHardDeleteWorkspace } from "../hooks/use-confirm-hard-delete-workspace";
import { hrefs } from "@/lib/hrefs";

const getWorkspaceActions = ({
  archiveWorkspace,
  workspace,
  activateWorkspace,
  activeWorkspaceName,
}: {
  workspace: Workspace & {
    isArchived?: boolean;
  };
  archiveWorkspace: ReturnType<
    typeof useMutationArchiveWorkspace
  >["mutateAsync"];
  activateWorkspace: ReturnType<
    typeof useMutationActivateWorkspace
  >["mutateAsync"];
  activeWorkspaceName: string | null | undefined;
}): OptionsSchema<"menu">[] => [
  {
    textValue: "Activate",
    icon: <Check />,
    id: "activate",
    isDisabled: workspace.name === activeWorkspaceName,
    onAction: () => activateWorkspace({ body: { name: workspace.name } }),
  },
  {
    textValue: "Edit",
    icon: <SlidersHorizontal />,
    id: "edit",
    href: hrefs.workspaces.edit(workspace.name),
  },
  {
    textValue: "Archive",
    icon: <X />,
    id: "archive",
    isDisabled:
      workspace.name === activeWorkspaceName || workspace.name === "default",
    onAction: () =>
      void archiveWorkspace({ path: { workspace_name: workspace.name } }),
  },
];

const getArchivedWorkspaceActions = ({
  workspace,
  restoreWorkspace,
  hardDeleteWorkspace,
}: {
  workspace: Workspace & {
    isArchived?: boolean;
  };
  restoreWorkspace: ReturnType<
    typeof useMutationArchiveWorkspace
  >["mutateAsync"];
  hardDeleteWorkspace: ReturnType<
    typeof useMutationHardDeleteWorkspace
  >["mutateAsync"];
}): OptionsSchema<"menu">[] => [
  {
    textValue: "Restore",
    icon: <Undo2 />,
    id: "restore",
    onAction: () =>
      restoreWorkspace({ path: { workspace_name: workspace.name } }),
  },
  {
    textValue: "Permanently delete",
    isDestructive: true,
    icon: <X />,
    id: "permanently-delete",
    onAction: () =>
      hardDeleteWorkspace({ path: { workspace_name: workspace.name } }),
  },
];

export function TableActionsWorkspaces({
  workspace,
  activeWorkspaceName,
}: {
  activeWorkspaceName: string | null | undefined;
  workspace: Workspace & { isArchived: boolean };
}) {
  const { mutateAsync: archiveWorkspace } = useMutationArchiveWorkspace();
  const { mutateAsync: restoreWorkspace } = useMutationRestoreWorkspace();
  const { mutateAsync: activateWorkspace } = useMutationActivateWorkspace();
  const hardDeleteWorkspace = useConfirmHardDeleteWorkspace();

  return (
    <MenuTrigger>
      <Button aria-label="Actions" isIcon variant="tertiary">
        <Ellipsis />
      </Button>
      <Popover placement="bottom end">
        <Menu
          items={
            workspace.isArchived
              ? getArchivedWorkspaceActions({
                  workspace,
                  restoreWorkspace,
                  hardDeleteWorkspace,
                })
              : getWorkspaceActions({
                  workspace,
                  archiveWorkspace,
                  activateWorkspace,
                  activeWorkspaceName,
                })
          }
        />
      </Popover>
    </MenuTrigger>
  );
}
