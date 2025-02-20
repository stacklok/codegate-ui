import {
  Card,
  CardBody,
  CardFooter,
  Description,
  FormDiscardChangesButton,
  FormSubmitButton,
  FormTextField,
  FormV2,
  Input,
  Label,
} from '@stacklok/ui-kit'
import { useMutationCreateWorkspace } from '../hooks/use-mutation-create-workspace'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  rename_to: z.string().nonempty(),
})
type FieldValues = z.infer<typeof schema>
const FIELD_NAME = schema.keyof().Enum

export function FormWorkspaceName({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useMutationCreateWorkspace()

  const isDefault = workspaceName === 'default'
  const isDisabled = isArchived || isPending || isDefault

  const description: string | null = isDefault
    ? 'Cannot rename the default workspace'
    : isArchived
      ? 'Cannot rename an archived workspace'
      : null

  const handleSubmit = ({ rename_to }: FieldValues) => {
    mutateAsync(
      { body: { name: workspaceName, rename_to } },
      {
        onSuccess: () => {
          navigate(`/workspace/${rename_to}`)
        },
      }
    )
  }

  return (
    <FormV2<FieldValues>
      onSubmit={handleSubmit}
      data-testid="workspace-name"
      options={{
        resolver: zodResolver(schema),
        defaultValues: {
          rename_to: workspaceName,
        },
      }}
    >
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody>
          <FormTextField
            isDisabled={isDisabled}
            key={workspaceName}
            name={FIELD_NAME.rename_to}
            isRequired
          >
            <Label>Workspace name</Label>
            <Input />
            {description ? (
              <Description className="mt-2 block">{description}</Description>
            ) : null}
          </FormTextField>
        </CardBody>
        <CardFooter className="justify-end gap-2">
          <FormDiscardChangesButton />
          <FormSubmitButton />
        </CardFooter>
      </Card>
    </FormV2>
  )
}
