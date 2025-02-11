import {
  Badge,
  Card,
  CardBody,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";

import { useListAllWorkspaces } from "../../../hooks/use-query-list-all-workspaces";
import { useQueryActiveWorkspaceName } from "../../../hooks/use-query-active-workspace-name";
import { TableActionsWorkspaces } from "./table-actions-workspaces";
import { hrefs } from "@/lib/hrefs";

function CellName({
  name,
  isArchived = false,
  isActive = false,
}: {
  name: string;
  isArchived: boolean;
  isActive: boolean;
}) {
  if (isArchived)
    return (
      <Cell className="text-disabled group-last/row:border-b-0">
        <span>{name}</span>
        &nbsp;&nbsp;
        <Badge size="sm" className="text-tertiary">
          Archived
        </Badge>
      </Cell>
    );

  if (isActive)
    return (
      <Cell className="group-last/row:border-b-0">
        <span>{name}</span>
        &nbsp;&nbsp;
        <Badge size="sm" variant="inverted">
          Active
        </Badge>
      </Cell>
    );

  return <Cell>{name}</Cell>;
}

export function TableWorkspaces() {
  const { data: workspaces } = useListAllWorkspaces();
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName();

  return (
    <Card>
      <CardBody className="p-0">
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
              <Row
                key={workspace.id}
                href={hrefs.workspaces.edit(workspace.name)}
              >
                <CellName
                  name={workspace.name}
                  isActive={workspace.is_active}
                  isArchived={workspace.isArchived}
                />
                <Cell alignment="end" className="group-last/row:border-b-0">
                  <TableActionsWorkspaces
                    activeWorkspaceName={activeWorkspaceName}
                    workspace={workspace}
                  />
                </Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
