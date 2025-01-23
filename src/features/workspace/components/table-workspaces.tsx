import { Workspace } from "@/api/generated";
import {
  Badge,
  Button,
  Cell,
  Column,
  Menu,
  MenuTrigger,
  OptionsSchema,
  Popover,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";

import { Undo2, X, SlidersHorizontal, Ellipsis, Check } from "lucide-react";
import { useMutationArchiveWorkspace } from "@/features/workspace/hooks/use-mutation-archive-workspace";
import { useMutationRestoreWorkspace } from "../hooks/use-mutation-restore-workspace";
import { useMutationHardDeleteWorkspace } from "../hooks/use-mutation-hard-delete-workspace";
import { useListAllWorkspaces } from "../hooks/use-query-list-all-workspaces";
import { useMutationActivateWorkspace } from "../hooks/use-mutation-activate-workspace";
import { useActiveWorkspaceName } from "../hooks/use-active-workspace-name";
import { useConfirmHardDeleteWorkspace } from "../hooks/use-confirm-hard-delete-workspace";

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
    href: `/workspace/${workspace.name}`,
  },
  {
    textValue: "Archive",
    icon: <X />,
    id: "archive",
    isDisabled:
      workspace.name === activeWorkspaceName || workspace.name === "default",
    onAction: () =>
      archiveWorkspace({ path: { workspace_name: workspace.name } }),
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

function CellName({
  name,
  isArchived = false,
}: {
  name: string;
  isArchived?: boolean;
}) {
  if (isArchived)
    return (
      <Cell className="text-disabled">
        <span>{name}</span>
        &nbsp;&nbsp;
        <Badge size="sm" className="text-tertiary">
          Archived
        </Badge>
      </Cell>
    );

  return <Cell>{name}</Cell>;
}

export function TableWorkspaces() {
  const { data: workspaces } = useListAllWorkspaces();
  const { data: activeWorkspaceName } = useActiveWorkspaceName();

  const { mutateAsync: archiveWorkspace } = useMutationArchiveWorkspace();
  const { mutateAsync: restoreWorkspace } = useMutationRestoreWorkspace();
  const { mutateAsync: activateWorkspace } = useMutationActivateWorkspace();
  const hardDeleteWorkspace = useConfirmHardDeleteWorkspace();

  return (
    <Table aria-label="List of workspaces">
      <Row>
        <TableHeader>
          <Column id="name" isRowHeader>
            Name
          </Column>
          <Column id="configuration"></Column>
        </TableHeader>
      </Row>
      <TableBody>
        {workspaces.map((workspace) => (
          <Row key={workspace.id} href={`/workspace/${workspace.name}`}>
            <CellName name={workspace.name} isArchived={workspace.isArchived} />
            <Cell alignment="end">
              <MenuTrigger>
                <Button isIcon variant="tertiary">
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
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
