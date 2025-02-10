import { useMutationPreferredModelWorkspace } from "../hooks/use-mutation-preferred-model-workspace";
import { ModelByProvider, MuxMatcherType } from "@/api/generated";
import { useWorkspaceMuxes } from "../hooks/use-preferred-preferred-model";
import { useModelsData } from "@/hooks/use-models-data";
import { FormCard } from "@/forms/FormCard";

const serializeModelPreference = (model: ModelByProvider) => {
  return `${model.provider_name}/${model.name}`;
};

export function WorkspacePreferredModel({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { data } = useWorkspaceMuxes({
    path: { workspace_name: workspaceName },
  });
  const { mutateAsync } = useMutationPreferredModelWorkspace();
  const { data: providerModels = [], isPending } = useModelsData();
  const modelOptions = (isPending ? [] : providerModels).map(
    serializeModelPreference,
  );

  const handleSubmit = ({ model: selectedModelId }: { model: string }) => {
    if (selectedModelId === "") {
      return mutateAsync({
        path: { workspace_name: workspaceName },
        body: [],
      });
    }

    const selectedModel = providerModels.find((model) => {
      return serializeModelPreference(model) === selectedModelId;
    });

    if (!selectedModel) {
      // this should not be a possibility, but there is no compile-time type guarantee
      throw new Error("Model not found");
    }

    const { provider_id, name } = selectedModel;

    mutateAsync({
      path: { workspace_name: workspaceName },
      body: [
        {
          matcher: "",
          provider_id,
          model: name,
          matcher_type: MuxMatcherType.CATCH_ALL,
        },
      ],
    });
  };

  console.log("modelOptions", modelOptions);

  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      model: {
        title: "Preferred Model",
        description:
          "Select the model you would like to use in this workspace.",
        type: "string",
        ...(modelOptions.length > 0
          ? {
              enum: modelOptions,
            }
          : {}),
      },
    },
    required: ["model"],
  };

  const initialData = {
    model: "",
  };
  console.log({ initialData });

  return (
    <FormCard
      data={initialData}
      isDisabled={isArchived}
      className={className}
      schema={schema}
      isPending={isPending}
      onSubmit={handleSubmit}
    />
  );
}
