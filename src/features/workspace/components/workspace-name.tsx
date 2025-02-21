import {
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  TextField,
} from '@stacklok/ui-kit'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useFormState } from '@/hooks/useFormState'
import { FormButtons } from '@/components/FormButtons'
import { FormEvent, useEffect } from 'react'
import { useMutationUpdateWorkspace } from '../hooks/use-mutation-update-workspace'

export function WorkspaceName({
  className,
  workspaceName: oldWorkspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useMutationUpdateWorkspace()
  const errorMsg = error?.detail ? `${error?.detail}` : ''
  const formState = useFormState({
    workspaceName: oldWorkspaceName,
  })
  const { values, updateFormValues, setInitialValues } = formState
  const isDefault = oldWorkspaceName === 'default'
  const isUneditable = isArchived || isPending || isDefault

  useEffect(() => {
    setInitialValues({ workspaceName: oldWorkspaceName })
  }, [setInitialValues, oldWorkspaceName])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    mutateAsync(
      {
        path: {
          workspace_name: oldWorkspaceName,
        },
        body: { name: values.workspaceName, config: null },
      },
      {
        onSuccess: () => {
          formState.setInitialValues({ workspaceName: values.workspaceName })
          navigate(`/workspace/${values.workspaceName}`)
        },
      }
    )
  }

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
            key={oldWorkspaceName}
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
