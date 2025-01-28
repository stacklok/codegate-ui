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
import { FormEvent } from "react";
import { Plus, Trash01 } from "@untitled-ui/icons-react";

export function WorkspaceModelOverrides({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { removeOverride, setOverrideItem, overrides, addOverride } =
    useModelOverridesWorkspace();
  const { mutateAsync } = useMutationModelOverridesWorkspace();
  const { data: models = [] } = useModelsData();

  console.log(overrides);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: overrides.map((item) => ({
        ...item,
        matcher_type: MuxMatcherType.FILE_REGEX,
      })),
    });
  };

  console.log({ models, overrides });

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Model Overrides</Text>
            <Text className="flex items-center text-secondary mb-0 text-balance">
              Route to different large language models based on file type,
              individual files, or repository.
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            {overrides.map((override, index) => (
              <div className="flex items-center gap-2 " key={index}>
                <div className="flex w-full justify-between">
                  <TextField
                    aria-label="Filter by (Regex)"
                    value={override?.matcher ?? ""}
                    name="matcher"
                    onChange={(matcher) =>
                      setOverrideItem({ id: index, matcher })
                    }
                  >
                    {index === 0 && <Label>Filter by</Label>}
                    <Input placeholder="eg file type, file name, or repository" />
                  </TextField>
                </div>
                <div className="flex w-2/5 gap-2">
                  <Select
                    name="model"
                    isRequired
                    className="w-full"
                    selectedKey={override?.model}
                    placeholder="Select the model"
                    onSelectionChange={(model) =>
                      setOverrideItem({ id: index, model: model.toString() })
                    }
                    items={models.map((model) => ({
                      textValue: model.name,
                      id: model.name,
                      provider: model.provider,
                    }))}
                  >
                    {index === 0 && <Label>Preferred Model</Label>}
                    <SelectButton />
                  </Select>
                  {index !== 0 && (
                    <Button
                      isIcon
                      variant="tertiary"
                      onPress={() => removeOverride(index)}
                    >
                      <Trash01 />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter className="justify-between">
          <Button className="w-fit" variant="tertiary" onPress={addOverride}>
            <Plus /> Additional Filter
          </Button>
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
