import {
  Button,
  Input,
  Select,
  SelectButton,
  TextField,
} from "@stacklok/ui-kit";
import { Trash01 } from "@untitled-ui/icons-react";
import {
  OverrideRule,
  useModelOverridesWorkspace,
} from "@/features/workspace/hooks/use-model-overrides-workspace";
import { useModelsData } from "@/hooks/useModelsData";

type Props = {
  index: number;
  override: OverrideRule;
};

export function SortableItem({ override, index }: Props) {
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
