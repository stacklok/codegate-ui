import { useCreateWorkspace } from "@/features/workspace/hooks/use-create-workspace";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Label,
  LinkButton,
  TextField,
} from "@stacklok/ui-kit";
import { useState } from "react";

export function WorkspaceCreation() {
  const [workspaceName, setWorkspaceName] = useState("");
  const { mutate, isPending, error } = useCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const handleCreateWorkspace = () => {
    mutate({ body: { name: workspaceName } });
  };

  return (
    <Card>
      <CardBody className="w-full">
        <TextField
          aria-label="Workspace name"
          validationBehavior="aria"
          isRequired
          onChange={setWorkspaceName}
        >
          <Label>Name</Label>
          <Input value={workspaceName} />
          {errorMsg && <div className="p-1 text-red-700">{errorMsg}</div>}
        </TextField>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <LinkButton variant="secondary">Cancel</LinkButton>
        <Button
          isDisabled={isPending || workspaceName === ""}
          onPress={() => handleCreateWorkspace()}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
