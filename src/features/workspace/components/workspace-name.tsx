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
import { useMutationCreateWorkspace } from "../hooks/use-mutation-create-workspace";
import { FormEvent, useEffect, useState } from "react";
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
  const { mutateAsync, isPending, error, reset } = useMutationCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const [name, setName] = useState(() => workspaceName);
  // NOTE: When navigating from one settings page to another, this value is not
  // updated, hence the synchronization effect
  useEffect(() => {
    setName(workspaceName);
    reset();
  }, [reset, workspaceName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(
      { body: { name: workspaceName, rename_to: name } },
      {
        onSuccess: () => navigate(`/workspace/${name}`),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria" key={workspaceName}>
      <Card
        className={twMerge(className, "shrink-0")}
        data-testid="workspace-name"
      >
        <CardBody>
          <TextField
            key={workspaceName}
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
            variant="secondary"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
