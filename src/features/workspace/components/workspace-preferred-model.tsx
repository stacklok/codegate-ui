import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  Form,
  Link,
  LinkButton,
  Text,
} from '@stacklok/ui-kit'
import { twMerge } from 'tailwind-merge'
import { useMutationPreferredModelWorkspace } from '../hooks/use-mutation-preferred-model-workspace'
import { MuxMatcherType } from '@/api/generated'
import { FormEvent } from 'react'
import { usePreferredModelWorkspace } from '../hooks/use-preferred-preferred-model'
import { Select, SelectButton } from '@stacklok/ui-kit'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import { FormButtons } from '@/components/FormButtons'
import { invalidateQueries } from '@/lib/react-query-utils'
import { v1GetWorkspaceMuxesQueryKey } from '@/api/generated/@tanstack/react-query.gen'
import { useQueryClient } from '@tanstack/react-query'

function MissingProviderBanner() {
  return (
    <Alert
      variant="warning"
      title="You must configure at least one provider before selecting your desired model."
    >
      <LinkButton variant="secondary" className="mt-4" href="/providers">
        Add Provider
      </LinkButton>
    </Alert>
  )
}

export function WorkspacePreferredModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const queryClient = useQueryClient()
  const { formState, isPending } = usePreferredModelWorkspace(workspaceName)
  const { mutateAsync } = useMutationPreferredModelWorkspace()
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders()
  const isModelsEmpty = !isPending && providerModels.length === 0

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    mutateAsync(
      {
        path: { workspace_name: workspaceName },
        body: [
          {
            matcher: '',
            matcher_type: MuxMatcherType.CATCH_ALL,
            ...formState.values.preferredModel,
          },
        ],
      },
      {
        onSuccess: () =>
          invalidateQueries(queryClient, [v1GetWorkspaceMuxesQueryKey]),
      }
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationBehavior="aria"
      data-testid="preferred-model"
    >
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Preferred Model</Text>
            <Text className="mb-0 flex items-center gap-1 text-balance text-secondary">
              Select the model you would like to use in this workspace. This
              section applies only if you are using the{' '}
              <Link variant="primary" href="/providers">
                MUX endpoint.
              </Link>
            </Text>
          </div>
          {isModelsEmpty && <MissingProviderBanner />}
          <div>
            <div className="flex flex-col gap-2">
              <Select
                aria-labelledby="preferred-model-id"
                name="model"
                isRequired
                isDisabled={isModelsEmpty}
                className="w-full"
                selectedKey={formState.values.preferredModel?.model}
                placeholder="Select the model"
                onSelectionChange={(model) => {
                  const preferredModelProvider = providerModels.find(
                    (item) => item.name === model
                  )
                  if (preferredModelProvider) {
                    formState.updateFormValues({
                      preferredModel: {
                        model: preferredModelProvider.name,
                        provider_id: preferredModelProvider.provider_id,
                      },
                    })
                  }
                }}
                items={providerModels.map((model) => ({
                  textValue: `${model.provider_name}/${model.name}`,
                  id: model.name,
                  provider: model.provider_id,
                }))}
              >
                <SelectButton />
              </Select>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-end">
          <FormButtons
            isPending={isPending}
            formState={formState}
            canSubmit={!isArchived}
          />
        </CardFooter>
      </Card>
    </Form>
  )
}
