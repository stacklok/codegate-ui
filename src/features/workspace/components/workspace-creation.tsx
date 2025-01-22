import { useCreateWorkspace } from "@/features/workspace/hooks/use-create-workspace";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  LinkButton,
  TextField,
} from "@stacklok/ui-kit";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkspaceCreation() {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");
  const { mutate, isPending, error } = useCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        body: { name: workspaceName },
      },
      {
        onSuccess: () => navigate("/workspaces"),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card>
        <CardBody className="w-full">
          <TextField
            aria-label="Workspace name"
            name="Workspace name"
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
          <LinkButton variant="secondary" href="/workspaces">
            Cancel
          </LinkButton>
          <Button
            isDisabled={workspaceName === ""}
            isPending={isPending}
            type="submit"
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
