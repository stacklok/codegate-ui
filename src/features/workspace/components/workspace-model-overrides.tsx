import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Label,
  Select,
  SelectButton,
  Text,
  TextField,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useModelOverridesWorkspace } from "../hooks/use-model-overrides-workspace";
import { useMutationModelOverridesWorkspace } from "../hooks/use-mutation-model-overrides-workspace";
import { MuxMatcherType } from "@/api/generated";
import { useModelsData } from "@/hooks/useModelsData";

export function WorkspaceModelOverrides({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { setOverrideItem, overrides } = useModelOverridesWorkspace();
  const { mutateAsync } = useMutationModelOverridesWorkspace();
  const { data: models = [] } = useModelsData();

  console.log(overrides);
  const handleSubmit = () => {
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: overrides.map((item) => ({
        ...item,
        matcher_type: MuxMatcherType.FILE_REGEX,
      })),
    });
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Model Overrides</Text>
            <Text className="flex items-center text-secondary mb-0 text-balance">
              Route to different large language models based on file type,
              individual files, or repository.
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              aria-label="Filter by (Regex)"
              value={overrides[0]?.matcher ?? ""}
              name="matcher"
              onChange={(matcher) => setOverrideItem({ id: 0, matcher })}
            >
              <Label>Filter by</Label>
              <Input placeholder="eg file type, file name, or repository" />
            </TextField>
            <Select
              name="model"
              isRequired
              selectedKey={overrides[0]?.model}
              placeholder="Select the model"
              onSelectionChange={(model) =>
                setOverrideItem({ id: 0, model: model.toString() })
              }
              items={models.map((model) => ({
                textValue: model.name,
                id: model.name,
                provider: model.provider,
              }))}
            >
              <Label>Preferred Model</Label>
              <SelectButton className="w-96" />
            </Select>
          </div>
        </CardBody>
        <CardFooter className="justify-end gap-2">
          <Button
            variant="secondary"
            isDisabled={isArchived || workspaceName === ""}
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
