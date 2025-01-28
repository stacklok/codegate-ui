import { useSortable } from "@dnd-kit/sortable";
import {
  Button,
  Input,
  Label,
  Select,
  SelectButton,
  TextField,
} from "@stacklok/ui-kit";
import { CSS } from "@dnd-kit/utilities";
import { Trash01 } from "@untitled-ui/icons-react";
import {
  OverrideRule,
  useModelOverridesWorkspace,
} from "@/features/workspace/hooks/use-model-overrides-workspace";
import { useModelsData } from "@/hooks/useModelsData";
import { GripVertical } from "lucide-react";

type Props = {
  index: number;
  override: OverrideRule;
};

export function SortableItem({ index, override }: Props) {
  const { removeOverride, setOverrideItem } = useModelOverridesWorkspace();
  const { id } = override;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { data: models = [] } = useModelsData();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex items-center gap-2 "
      key={index}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <GripVertical />
      <div className="flex w-full justify-between">
        <TextField
          aria-label="Filter by (Regex)"
          value={override?.matcher ?? ""}
          name="matcher"
          onChange={(matcher) => setOverrideItem(index, { matcher })}
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
            setOverrideItem(index, { model: model.toString() })
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
  );
}
