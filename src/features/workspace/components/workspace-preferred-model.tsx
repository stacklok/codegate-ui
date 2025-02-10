import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Link,
  LinkButton,
  Text,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationPreferredModelWorkspace } from "../hooks/use-mutation-preferred-model-workspace";
import { MuxMatcherType } from "@/api/generated";
import { FormEvent } from "react";
import { usePreferredModelWorkspace } from "../hooks/use-preferred-preferred-model";
import { Select, SelectButton } from "@stacklok/ui-kit";
import { useQueryListAllModelsForAllProviders } from "@/hooks/use-query-list-all-models-for-all-providers";

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
  );
}

export function WorkspacePreferredModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { preferredModel, setPreferredModel, isPending } =
    usePreferredModelWorkspace(workspaceName);
  const { mutateAsync } = useMutationPreferredModelWorkspace();
  const { data: providerModels = [] } = useQueryListAllModelsForAllProviders();
  const { model, provider_id } = preferredModel;
  const isModelsEmpty = !isPending && providerModels.length === 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: [
        {
          matcher: "",
          provider_id,
          model,
          matcher_type: MuxMatcherType.CATCH_ALL,
        },
      ],
    });
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Preferred Model</Text>
            <Text className="flex items-center gap-1 text-secondary mb-0 text-balance">
              Select the model you would like to use in this workspace. This
              section applies only if you are using the{" "}
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
                selectedKey={preferredModel?.model}
                placeholder="Select the model"
                onSelectionChange={(model) => {
                  const preferredModelProvider = providerModels.find(
                    (item) => item.name === model,
                  );
                  if (preferredModelProvider) {
                    setPreferredModel({
                      model: preferredModelProvider.name,
                      provider_id: preferredModelProvider.provider_id,
                    });
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
          <Button isDisabled={isArchived || isModelsEmpty} type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
