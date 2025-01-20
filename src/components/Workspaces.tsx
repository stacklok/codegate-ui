import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";

export function Workspaces() {
  return (
    <div>
      <h1 className="text-4xl">Manage Workspaces</h1>
      <Table aria-label="List of workspaces">
        <Row>
          <TableHeader>
            <Column id="name" isRowHeader>
              Name
            </Column>
            <Column id="configuration">Configuration</Column>
          </TableHeader>
        </Row>
        <TableBody>
          <Row>
            <Cell>My workspace</Cell>
            <Cell>hello</Cell>
          </Row>
          <Row>
            <Cell>My workspace</Cell>
            <Cell>hello</Cell>
          </Row>
        </TableBody>
      </Table>
    </div>
  );
}
