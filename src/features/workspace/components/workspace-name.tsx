import {
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  TextField,
} from "@stacklok/ui-kit";
import { useMutationCreateWorkspace } from "../hooks/use-mutation-create-workspace";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useFormState } from "@/hooks/useFormState";
import { FormButtons } from "@/components/FormButtons";

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
  const { mutateAsync, isPending, error } = useMutationCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";
  const formState2 = useFormState({
    workspaceName,
  });
  const { formState, updateFormState } = formState2;

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    mutateAsync(
      { body: { name: workspaceName, rename_to: formState.workspaceName } },
      {
        onSuccess: () => navigate(`/workspace/${formState.workspaceName}`),
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validationBehavior="aria"
      data-testid="workspace-name"
    >
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-6">
          <TextField
            key={workspaceName}
            aria-label="Workspace name"
            value={formState.workspaceName}
            name="Workspace name"
            validationBehavior="aria"
            isRequired
            isDisabled={isArchived}
            onChange={(workspaceName) => updateFormState({ workspaceName })}
          >
            <Label>Workspace name</Label>
            <Input />
          </TextField>
        </CardBody>
        <CardFooter className="justify-end">
          <FormButtons
            formErrorMessage={errorMsg}
            formState={formState2}
            canSubmit={!isArchived && !isPending}
          />
        </CardFooter>
      </Card>
    </Form>
  );
}
