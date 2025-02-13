import {
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  TextField,
} from '@stacklok/ui-kit'
import { useMutationCreateWorkspace } from '../hooks/use-mutation-create-workspace'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useFormState } from '@/hooks/useFormState'
import { FormButtons } from '@/components/FormButtons'
import { FormEvent } from 'react'

export function WorkspaceName({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useMutationCreateWorkspace()
  const errorMsg = error?.detail ? `${error?.detail}` : ''
  const formState = useFormState({
    workspaceName,
  })
  const { values, updateFormValues } = formState
  const isDefault = workspaceName === 'default'
  const isUneditable = isArchived || isPending || isDefault

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    mutateAsync(
      { body: { name: workspaceName, rename_to: values.workspaceName } },
      {
        onSuccess: () => {
          formState.setInitialValues({ workspaceName: values.workspaceName });
          navigate(`/workspace/${values.workspaceName}`);
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validationBehavior="aria"
      data-testid="workspace-name"
    >
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody className="flex flex-col gap-6">
          <TextField
            isReadOnly={isUneditable}
            key={workspaceName}
            aria-label="Workspace name"
            value={values.workspaceName}
            name="Workspace name"
            validationBehavior="aria"
            isRequired
            isDisabled={isUneditable}
            onChange={(workspaceName) => updateFormValues({ workspaceName })}
          >
            <Label>Workspace name</Label>
            <Input />
          </TextField>
        </CardBody>
        <CardFooter className="justify-end">
          <FormButtons
            isPending={isPending}
            formErrorMessage={errorMsg}
            formSideNote={
              isDefault ? 'Cannot rename the default workspace' : undefined
            }
            formState={formState}
            canSubmit={!isArchived}
          />
        </CardFooter>
      </Card>
    </Form>
  )
}
