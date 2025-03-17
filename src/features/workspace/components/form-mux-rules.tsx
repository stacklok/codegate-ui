import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  FormSubmitButton,
  FormV2,
  Link,
  LinkButton,
  Text,
} from '@stacklok/ui-kit'
import { twMerge } from 'tailwind-merge'
import { useMutationPreferredModelWorkspace } from '../hooks/use-mutation-preferred-model-workspace'
import { MuxMatcherType, V1GetWorkspaceMuxesResponse } from '@/api/generated'
import {
  FlipBackward,
  LayersThree01,
  LinkExternal01,
} from '@untitled-ui/icons-react'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import { useQueryMuxingRulesWorkspace } from '../hooks/use-query-muxing-rules-workspace'
import { FormMuxFieldsArray } from './form-mux-fields-array'
import {
  schemaWorkspaceConfig,
  WorkspaceConfigFieldValues,
} from '../lib/schema-mux'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormMuxButtonAddRow } from './form-mux-button-add-row'
import { FormMuxRulesContextProvider } from './form-mux-context-provider'
import { deserializeMuxModel, serializeMuxModel } from '../lib/mux-model-serde'
import { SubmitHandler } from 'react-hook-form'
import { handleMuxFormErrors } from '../lib/handle-mux-form-errors'
import { FormDiscardChangesButton } from './tmp/form-discard-changes-button'

const DEFAULT_VALUES: WorkspaceConfigFieldValues = {
  muxing_rules: [
    {
      // @ts-expect-error - we start with invalid state
      model: undefined,
      matcher: 'Catch-all',
      matcher_type: MuxMatcherType.CATCH_ALL,
    },
  ],
}

const fromApiMuxingRules = (
  rules: V1GetWorkspaceMuxesResponse
): WorkspaceConfigFieldValues => {
  return {
    muxing_rules: rules.map(
      ({ matcher_type, model, matcher, provider_name, provider_type }) => ({
        model: serializeMuxModel({
          name: model,
          provider_type,
          provider_name: provider_name as string,
        }),
        matcher_type,
        matcher: matcher ?? '',
      })
    ),
  }
}

function MissingProviderBanner() {
  return (
    // TODO needs to update the related ui-kit component that diverges from the design
    <Alert
      variant="warning"
      className="bg-brand-200 font-normal text-primary dark:bg-[#272472]"
      title="You must configure at least one provider before selecting your desired model."
    >
      <LinkButton
        className="mt-4 text-white dark:bg-[#7D7DED]"
        href="/providers"
      >
        Configure a provider
      </LinkButton>
    </Alert>
  )
}

export function FormMuxRules({
  className,
  workspaceName,
  isDisabled,
}: {
  className?: string
  workspaceName: string
  isDisabled: boolean
}) {
  const { data: muxRulesFromApi, isPending } =
    useQueryMuxingRulesWorkspace(workspaceName)

  const { mutateAsync } = useMutationPreferredModelWorkspace()
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders()
  const isModelsEmpty = !isPending && providerModels.length === 0

  const handleSubmit: SubmitHandler<WorkspaceConfigFieldValues> = (data) => {
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: data.muxing_rules.map(({ matcher, matcher_type, model }) => {
        const {
          name: modelName,
          provider_name,
          provider_type,
        } = deserializeMuxModel(model)
        return {
          matcher_type,
          model: modelName,
          provider_type,
          matcher,
          provider_name,
        }
      }),
    })
  }

  if (isModelsEmpty) {
    return (
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody className="flex flex-col gap-2">
          <Text className="text-primary">Model Muxing</Text>
          <MissingProviderBanner />
        </CardBody>
      </Card>
    )
  }

  const defaultValues =
    muxRulesFromApi.length > 0
      ? fromApiMuxingRules(muxRulesFromApi)
      : DEFAULT_VALUES

  return (
    <FormV2<WorkspaceConfigFieldValues>
      onSubmit={handleSubmit}
      onError={handleMuxFormErrors}
      options={{
        values: defaultValues,
        resolver: zodResolver(schemaWorkspaceConfig),
        shouldFocusError: true,
      }}
    >
      <FormMuxRulesContextProvider>
        <Card className={twMerge(className, 'shrink-0')}>
          <CardBody>
            <div className="flex flex-col justify-start">
              <Text className="text-primary">Model Muxing</Text>
              <Text className="mb-6 flex items-center gap-1 text-balance text-secondary">
                Select the model you would like to use in this workspace. This
                section applies only if you are using the MUX endpoint.
                <Link
                  variant="primary"
                  className="flex items-center gap-1 no-underline"
                  href="https://docs.codegate.ai/features/muxing"
                  target="_blank"
                >
                  Learn more <LinkExternal01 className="size-4" />
                </Link>
              </Text>
            </div>

            <FormMuxFieldsArray isDisabled={isDisabled} />
          </CardBody>

          <CardFooter className="justify-between">
            <div className="flex gap-2">
              <FormMuxButtonAddRow isDisabled={isDisabled} />
              <LinkButton variant="tertiary" href="/providers">
                <LayersThree01 /> Manage providers
              </LinkButton>
            </div>
            <div className="flex gap-2">
              <FormDiscardChangesButton
                aria-label="Revert changes"
                isDisabled={isDisabled}
                defaultValues={defaultValues}
              >
                <FlipBackward />
                Revert changes
              </FormDiscardChangesButton>
              <FormSubmitButton aria-label="Save" isDisabled={isDisabled}>
                Save
              </FormSubmitButton>
            </div>
          </CardFooter>
        </Card>
      </FormMuxRulesContextProvider>
    </FormV2>
  )
}
