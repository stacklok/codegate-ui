import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";

export function Workspaces() {
  const data = [
    {
      name: "Workspace 1",
      configuration: "hello",
    },
    {
      name: "Workspace 2",
      configuration: "hello",
    },
  ];

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
          {data.map((workspace) => (
            <Row key={workspace.name}>
              <Cell>{workspace.name}</Cell>
              <Cell>hello</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
