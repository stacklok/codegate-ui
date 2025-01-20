import { Card, CardBody, Input, Label, TextField } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";

export function WorkspaceName({ className }: { className?: string }) {
  return (
    <Card className={twMerge(className, "shrink-0")}>
      <CardBody>
        <TextField value="my-awesome-workspace" isReadOnly>
          <Label>Workspace name</Label>
          <Input />
        </TextField>
      </CardBody>
    </Card>
  );
}
