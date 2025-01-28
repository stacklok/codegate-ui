import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Label,
  Text,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationModelOverridesWorkspace } from "../hooks/use-mutation-model-overrides-workspace";
import { MuxMatcherType } from "@/api/generated";
import { FormEvent } from "react";
import { Plus } from "@untitled-ui/icons-react";
import { useModelOverridesWorkspace } from "../hooks/use-model-overrides-workspace";
import { Input, Select, SelectButton, TextField } from "@stacklok/ui-kit";
import { Trash01 } from "@untitled-ui/icons-react";
import { OverrideRule } from "@/features/workspace/hooks/use-model-overrides-workspace";
import { useModelsData } from "@/hooks/useModelsData";

import { SortableArea } from "@/components/SortableArea";

type SortableItemProps = {
  index: number;
  override: OverrideRule;
};

export function SortableItem({ override, index }: SortableItemProps) {
  const { removeOverride, setOverrideItem } = useModelOverridesWorkspace();

  const { data: models = [] } = useModelsData();

  return (
    <div className="flex items-center gap-2" key={override.id}>
      <div className="flex w-full justify-between">
        <TextField
          aria-labelledby="filter-by-label-id"
          onFocus={(event) => event.preventDefault()}
          value={override?.matcher ?? ""}
          name="matcher"
          onChange={(matcher) => {
            setOverrideItem(override.id, { matcher });
          }}
        >
          <Input placeholder="eg file type, file name, or repository" />
        </TextField>
      </div>
      <div className="flex w-2/5 gap-2">
        <Select
          aria-labelledby="preferred-model-id"
          name="model"
          isRequired
          className="w-full"
          selectedKey={override?.model}
          placeholder="Select the model"
          onSelectionChange={(model) =>
            setOverrideItem(override.id, { model: model.toString() })
          }
          items={models.map((model) => ({
            textValue: model.name,
            id: model.name,
            provider: model.provider,
          }))}
        >
          <SelectButton />
        </Select>
        {index !== 0 && (
          <Button
            aria-label="remove override"
            isIcon
            variant="tertiary"
            onPress={() => removeOverride(index)}
          >
            <Trash01 />
          </Button>
        )}
      </div>
    </div>
  );
}

export function WorkspaceModelOverrides({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { overrides, addOverride, setOverrides } = useModelOverridesWorkspace();
  const { mutateAsync } = useMutationModelOverridesWorkspace();

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
          <div>
            <div className="flex gap-2">
              <div className="w-12">&nbsp;</div>
              <div className="w-full">
                <Label id="filter-by-label-id">Filter by</Label>
              </div>
              <div className="w-2/5">
                <Label id="preferred-model-id">Preferred Model</Label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <SortableArea items={overrides} setItems={setOverrides}>
                {(override, index) => (
                  <SortableItem
                    key={override.id}
                    index={index}
                    override={override}
                  />
                )}
              </SortableArea>
            </div>
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
