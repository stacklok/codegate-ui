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
import { MuxMatcherType } from '@/api/generated'
import { LinkExternal01 } from '@untitled-ui/icons-react'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import { useQueryMuxingRulesWorkspace } from '../hooks/use-query-muxing-rules-workspace'
import { FormMuxFieldsArray } from './form-mux-fields-array'
import {
  schemaWorkspaceConfig,
  WorkspaceConfigFieldValues,
} from '../lib/schema-mux'
import { zodResolver } from '@hookform/resolvers/zod'

const DEFAULT_VALUES: WorkspaceConfigFieldValues = {
  muxing_rules: [
    {
      id: MuxMatcherType.CATCH_ALL,
      model: '',
      matcher: '',
      matcher_type: MuxMatcherType.CATCH_ALL,
    },
  ],
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

export function WorkspaceMuxingModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const { data: muxingRules, isPending } =
    useQueryMuxingRulesWorkspace(workspaceName)

  const { mutateAsync } = useMutationPreferredModelWorkspace()
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders()
  const isModelsEmpty = !isPending && providerModels.length === 0

  const handleSubmit = (data: WorkspaceConfigFieldValues) => {
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: data.muxing_rules.map((rule) => {
        return rule.matcher
          ? { ...rule, matcher_type: MuxMatcherType.FILENAME_MATCH }
          : { ...rule }
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

  return (
    <FormV2<WorkspaceConfigFieldValues>
      onSubmit={handleSubmit}
      data-testid="preferred-model"
      options={{
        defaultValues: DEFAULT_VALUES,
        resolver: zodResolver(schemaWorkspaceConfig),
      }}
    >
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Model Muxing</Text>
            <Text className="mb-0 flex items-center gap-1 text-balance text-secondary">
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

          <div className="flex w-full flex-col gap-2">
            <FormMuxFieldsArray />
          </div>
        </CardBody>
        <div></div>

        <CardFooter className="justify-end">
          <FormSubmitButton />
        </CardFooter>
      </Card>
    </FormV2>
  )
}
