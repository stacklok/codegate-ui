import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormSubmitButton,
  FormV2,
  Input,
  Label,
  Link,
  LinkButton,
  Text,
  TextField,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { twMerge } from 'tailwind-merge'
import { useMutationPreferredModelWorkspace } from '../hooks/use-mutation-preferred-model-workspace'
import {
  MuxMatcherType,
  V1ListAllModelsForAllProvidersResponse,
} from '@/api/generated'
import {
  LayersThree01,
  LinkExternal01,
  Plus,
  Trash01,
} from '@untitled-ui/icons-react'
import { SortableArea } from '@/components/SortableArea'
import { WorkspaceModelsDropdown } from './workspace-models-dropdown'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import { useQueryMuxingRulesWorkspace } from '../hooks/use-query-muxing-rules-workspace'
import {
  PreferredMuxRule,
  useMuxingRulesFormState,
} from '../hooks/use-muxing-rules-form-workspace'
import { FormButtons } from '@/components/FormButtons'
import { WorkspaceMuxesFieldsArray } from './workspace-muxes-fields-array'
import {
  schemaWorkspaceConfig,
  WorkspaceConfigFieldValues,
} from '../lib/workspace-config-schema'
import { zodResolver } from '@hookform/resolvers/zod'

const DEFAULT_VALUES: WorkspaceConfigFieldValues = {
  muxing_rules: [
    {
      provider_id: '',
      provider_name: '',
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

type SortableItemProps = {
  index: number
  rule: PreferredMuxRule
  models: V1ListAllModelsForAllProvidersResponse
  isArchived: boolean
  showRemoveButton: boolean
  isDefaultRule: boolean
  setRuleItem: (rule: PreferredMuxRule) => void
  removeRule: (index: number) => void
}

function SortableItem({
  rule,
  index,
  setRuleItem,
  removeRule,
  models,
  showRemoveButton,
  isArchived,
  isDefaultRule,
}: SortableItemProps) {
  const placeholder = isDefaultRule ? 'Catch-all' : 'e.g. file type, file name'
  return (
    <div className="flex items-center gap-2" key={rule.id}>
      <TextField
        aria-labelledby="filter-by-label-id"
        value={rule?.matcher ?? ''}
        isDisabled={isArchived || isDefaultRule}
        name="matcher"
        onChange={(matcher) => {
          setRuleItem({ ...rule, matcher })
        }}
      >
        <Input placeholder={placeholder} />
      </TextField>
      <div className="flex w-3/5 gap-2">
        <WorkspaceModelsDropdown
          rule={rule}
          isArchived={isArchived}
          models={models}
          onChange={({ model, provider_id }) =>
            setRuleItem({ ...rule, provider_id, model })
          }
        />
        {showRemoveButton && !isDefaultRule ? (
          <Button
            aria-label="remove mux rule"
            isIcon
            variant="tertiary"
            onPress={() => removeRule(index)}
          >
            <Trash01 />
          </Button>
        ) : (
          <div className="min-w-10 max-w-10" />
        )}
      </div>
    </div>
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
  const { addRule, setRules, setRuleItem, removeRule, formState } =
    useMuxingRulesFormState(muxingRules)
  const {
    values: { rules },
  } = formState

  const { mutateAsync } = useMutationPreferredModelWorkspace()
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders()
  const isModelsEmpty = !isPending && providerModels.length === 0
  const showRemoveButton = rules.length > 1

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
            <WorkspaceMuxesFieldsArray />

            <SortableArea
              items={rules}
              setItems={setRules}
              disableDragByIndex={rules.length - 1}
            >
              {(rule, index) => {
                const isDefaultRule = rules.length - 1 === index
                return (
                  <SortableItem
                    key={rule.id}
                    index={index}
                    rule={rule}
                    setRuleItem={setRuleItem}
                    removeRule={removeRule}
                    models={providerModels}
                    showRemoveButton={showRemoveButton}
                    isArchived={!!isArchived}
                    isDefaultRule={isDefaultRule}
                  />
                )
              }}
            </SortableArea>
          </div>
        </CardBody>
        <div>
          <FormSubmitButton />
        </div>
        {/* <CardFooter className="justify-between">
          <div className="flex gap-2">
            <Button
              className="w-fit"
              variant="tertiary"
              onPress={addRule}
              isDisabled={isArchived}
            >
              <Plus /> Add Filter
            </Button>

            <LinkButton className="w-fit" variant="tertiary" href="/providers">
              <LayersThree01 /> Manage providers
            </LinkButton>
          </div>
          <FormButtons
            isPending={isPending}
            formState={formState}
            canSubmit={!isArchived}
          />
        </CardFooter> */}
      </Card>
    </FormV2>
  )
}
