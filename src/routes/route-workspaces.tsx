import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { useListWorkspaces } from "@/features/workspace/hooks/use-list-workspaces";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Badge,
  Breadcrumb,
  Breadcrumbs,
  Button,
  Cell,
  Column,
  LinkButton,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";
import { Settings, SquarePlus } from "lucide-react";
import { useArchivedWorkspaces } from "@/features/workspace/hooks/use-archived-workspaces";
import { Workspace } from "@/api/generated";
import SvgFlipBackward from "@/components/icons/FlipBackward";
import { useRestoreWorkspaceButton } from "@/features/workspace/hooks/use-restore-workspace-button";
import { useKbdShortcuts } from "@/hooks/use-kbd-shortcuts";
import { useNavigate } from "react-router-dom";
import { hrefs } from "@/lib/hrefs";

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

function CellConfiguration({
  name,
  isArchived = false,
}: {
  name: string;
  isArchived?: boolean;
}) {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName: name });

  if (isArchived) {
    return (
      <Cell>
        <Button
          variant="tertiary"
          className="flex w-full gap-2 items-center"
          {...restoreButtonProps}
        >
          <SvgFlipBackward /> Restore Configuration
        </Button>
      </Cell>
    );
  }

  return (
    <Cell>
      <LinkButton
        href={`/workspace/${name}`}
        className="w-full"
        variant="tertiary"
      >
        <Settings />
        Settings
      </LinkButton>
    </Cell>
  );
}

export function RouteWorkspaces() {
  const { data: availableWorkspaces } = useListWorkspaces();
  const { data: archivedWorkspaces } = useArchivedWorkspaces();
  const workspaces: (Workspace & { isArchived?: boolean })[] = [
    ...(availableWorkspaces?.workspaces ?? []),
    ...(archivedWorkspaces?.workspaces.map((item) => ({
      ...item,
      isArchived: true,
    })) ?? []),
  ];

  const navigate = useNavigate();

  useKbdShortcuts([["c", () => navigate(hrefs.workspaces.create)]]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Manage Workspaces</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Manage Workspaces">
        <LinkButton href={hrefs.workspaces.create} className="w-fit gap-2">
          <SquarePlus /> Create Workspace
        </LinkButton>
      </WorkspaceHeading>

      <Table aria-label="List of workspaces">
        <Row>
          <TableHeader>
            <Column id="name" isRowHeader className="w-4/5">
              Name
            </Column>
            <Column id="configuration" className="flex justify-center">
              Configuration
            </Column>
          </TableHeader>
        </Row>
        <TableBody>
          {workspaces.map((workspace) => (
            <Row key={workspace.name}>
              <CellName
                name={workspace.name}
                isArchived={workspace.isArchived}
              />
              <CellConfiguration
                name={workspace.name}
                isArchived={workspace.isArchived}
              />
            </Row>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
