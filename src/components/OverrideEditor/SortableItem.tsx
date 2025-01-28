import { useSortable } from "@dnd-kit/sortable";
import {
  Button,
  Input,
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

export function SortableItem({ override, index }: Props) {
  const { removeOverride, setOverrideItem } = useModelOverridesWorkspace();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: override.id });
  const { data: models = [] } = useModelsData();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex items-center gap-2 " key={override.id} style={style}>
      <div ref={setNodeRef} {...attributes} {...listeners} className="size-8">
        <GripVertical className="size-full" />
      </div>
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
