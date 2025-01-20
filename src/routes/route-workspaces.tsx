import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { useListWorkspaces } from "@/features/workspace/hooks/use-list-workspaces";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Breadcrumb,
  Breadcrumbs,
  Cell,
  Column,
  LinkButton,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";
import { Settings, SquarePlus } from "lucide-react";

export function RouteWorkspaces() {
  const result = useListWorkspaces();
  const workspaces = result.data?.workspaces ?? [];

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Manage Workspaces</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Manage Workspaces">
        <LinkButton href="/workspace/create" className="w-fit gap-2">
          <SquarePlus /> Create Workspace
        </LinkButton>
      </WorkspaceHeading>

      <Table aria-label="List of workspaces">
        <Row>
          <TableHeader>
            <Column id="name" isRowHeader className="w-full">
              Name
            </Column>
            <Column id="configuration" className="w-56">
              Configuration
            </Column>
          </TableHeader>
        </Row>
        <TableBody>
          {workspaces.map((workspace) => (
            <Row key={workspace.name}>
              <Cell>{workspace.name}</Cell>
              <Cell>
                <LinkButton
                  href={`/workspace/${workspace.name}`}
                  variant="tertiary"
                >
                  <Settings />
                  Settings
                </LinkButton>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
