import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  TextField,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkspaceName({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState(workspaceName);
  const { mutate, isPending, error } = useCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { body: { name: workspaceName, rename_to: name } },
      {
        onSuccess: () => navigate(`/workspace/${name}`),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card
        className={twMerge(className, "shrink-0")}
        data-testid="workspace-name"
      >
        <CardBody>
          <TextField
            aria-label="Workspace name"
            value={name}
            name="Workspace name"
            validationBehavior="aria"
            isRequired
            isDisabled={isArchived}
            onChange={setName}
          >
            <Label>Workspace name</Label>
            <Input />
            {errorMsg && <div className="p-1 text-red-700">{errorMsg}</div>}
          </TextField>
        </CardBody>
        <CardFooter className="justify-end gap-2">
          <Button
            isDisabled={isArchived || name === ""}
            isPending={isPending}
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
