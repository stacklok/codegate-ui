import { useWorkspacesData } from "@/hooks/useWorkspacesData";
import {
  Cell,
  Column,
  Heading,
  LinkButton,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";
import { Settings } from "lucide-react";

export function Workspaces() {
  const result = useWorkspacesData();
  const workspaces = result.data?.workspaces ?? [];

  return (
    <div>
      <Heading level={1} className="mb-5">
        Manage Workspaces
      </Heading>

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
    </div>
  );
}
