import { Column, Row, Table, TableBody, TableHeader } from "@stacklok/ui-kit";

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
        <TableBody></TableBody>
      </Table>
    </div>
  );
}
