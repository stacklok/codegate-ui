import { useModelOverridesWorkspace } from "@/features/workspace/hooks/use-model-overrides-workspace";
import { SortableItem } from "./SortableItem";
import { Label } from "@stacklok/ui-kit";
import { SortableArea } from "../SortableArea";

export function OverrideEditor() {
  const { overrides, setOverrides } = useModelOverridesWorkspace();

  return (
    <div>
      <div className="flex gap-2">
        <div className="w-full pl-8">
          <Label id="filter-by-label-id">Preferred Model</Label>
        </div>
        <div className="w-2/5">
          <Label id="preferred-model-id">Preferred Model</Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SortableArea items={overrides} setItems={setOverrides}>
          {overrides.map((override, index) => (
            <SortableItem key={override.id} index={index} override={override} />
          ))}
        </SortableArea>
      </div>
    </div>
  );
}
