import { Card, CardBody, Input, Label, TextField } from "@stacklok/ui-kit";

export function WorkspaceName({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardBody>
        <TextField value="my-awesome-workspace" isReadOnly>
          <Label>Workspace name</Label>
          <Input />
        </TextField>
      </CardBody>
    </Card>
  );
}
