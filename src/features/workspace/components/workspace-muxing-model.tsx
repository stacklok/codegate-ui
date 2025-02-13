import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  Link,
  LinkButton,
  Text,
  TextField,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationPreferredModelWorkspace } from "../hooks/use-mutation-preferred-model-workspace";
import {
  MuxMatcherType,
  V1ListAllModelsForAllProvidersResponse,
} from "@/api/generated";
import { FormEvent } from "react";
import {
  LayersThree01,
  LinkExternal01,
  Plus,
  Trash01,
} from "@untitled-ui/icons-react";
import { SortableArea } from "@/components/SortableArea";
import { WorkspaceModelsDropdown } from "./workspace-models-dropdown";
import { useQueryListAllModelsForAllProviders } from "@/hooks/use-query-list-all-models-for-all-providers";
import { useQueryMuxingRulesWorkspace } from "../hooks/use-query-muxing-rules-workspace";
import {
  PreferredMuxRule,
  useMuxingRulesFormState,
} from "../hooks/use-muxing-rules-form-workspace";
import { FormButtons } from "@/components/FormButtons";

function MissingProviderBanner() {
  return (
    // TODO needs to update the related ui-kit component that diverges from the design
    <Alert
      variant="warning"
      className="bg-brand-200 text-primary font-normal dark:bg-[#272472]"
      title="You must configure at least one provider before selecting your desired model."
    >
      <LinkButton
        className="mt-4 text-white dark:bg-[#7D7DED]"
        href="/providers"
      >
        Configure a provider
      </LinkButton>
    </Alert>
  );
}

type SortableItemProps = {
  index: number;
  rule: PreferredMuxRule;
  models: V1ListAllModelsForAllProvidersResponse;
  isArchived: boolean;
  showRemoveButton: boolean;
  isDefaultRule: boolean;
  setRuleItem: (rule: PreferredMuxRule) => void;
  removeRule: (index: number) => void;
};

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
  const placeholder = isDefaultRule ? "Catch All" : "eg file type, file name";
  return (
    <div className="flex items-center gap-2" key={rule.id}>
      <div className="flex w-full justify-between">
        <TextField
          aria-labelledby="filter-by-label-id"
          onFocus={(event) => event.preventDefault()}
          value={rule?.matcher ?? ""}
          isDisabled={isArchived || isDefaultRule}
          name="matcher"
          onChange={(matcher) => {
            setRuleItem({ ...rule, matcher });
          }}
        >
          <Input placeholder={placeholder} />
        </TextField>
      </div>
      <div className="flex w-3/5 gap-2">
        <WorkspaceModelsDropdown
          rule={rule}
          isArchived={isArchived}
          models={models}
          onChange={({ model, provider_id }) =>
            setRuleItem({ ...rule, provider_id, model })
          }
        />
        {showRemoveButton && !isDefaultRule && (
          <Button
            aria-label="remove mux rule"
            isIcon
            variant="tertiary"
            onPress={() => removeRule(index)}
          >
            <Trash01 />
          </Button>
        )}
      </div>
    </div>
  );
}

export function WorkspaceMuxingModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { data: muxingRules, isPending } =
    useQueryMuxingRulesWorkspace(workspaceName);
  const { addRule, setRules, setRuleItem, removeRule, formState } =
    useMuxingRulesFormState(muxingRules);
  const {
    values: { rules },
  } = formState;

  const { mutateAsync } = useMutationPreferredModelWorkspace();
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders();
  const isModelsEmpty = !isPending && providerModels.length === 0;
  const showRemoveButton = rules.length > 1;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutateAsync(
      {
        path: { workspace_name: workspaceName },
        body: rules.map(({ id, ...rest }) => {
          void id;

          return rest.matcher
            ? { ...rest, matcher_type: MuxMatcherType.FILENAME_MATCH }
            : { ...rest };
        }),
      },
      {
        onSuccess: () => {
          formState.setInitialValues({ rules });
        },
      },
    );
  };

  if (isModelsEmpty) {
    return (
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-2">
          <Text className="text-primary">Model Muxing</Text>
          <MissingProviderBanner />
        </CardBody>
      </Card>
    );
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationBehavior="aria"
      data-testid="preferred-model"
    >
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Model Muxing</Text>
            <Text className="flex items-center gap-1 text-secondary mb-0 text-balance">
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

          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <div className="w-12">&nbsp;</div>
              <div className="w-full">
                <Label id="filter-by-label-id" className="flex items-center">
                  Filter by
                  <TooltipTrigger delay={0}>
                    <TooltipInfoButton aria-label="Filter by description" />
                    <Tooltip>
                      Filters are applied in top-down order. The first rule that
                      matches each prompt determines the chosen model. An empty
                      filter applies to all prompts.
                    </Tooltip>
                  </TooltipTrigger>
                </Label>
              </div>
              <div className="w-3/5">
                <Label id="preferred-model-id">Preferred Model</Label>
              </div>
            </div>
            <SortableArea
              items={rules}
              setItems={setRules}
              disableDragByIndex={rules.length - 1}
            >
              {(rule, index) => {
                const isDefaultRule = rules.length - 1 === index;
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
                );
              }}
            </SortableArea>
          </div>
        </CardBody>
        <CardFooter className="justify-between">
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
        </CardFooter>
      </Card>
    </Form>
  );
}
