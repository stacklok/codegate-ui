import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useModelOverridesWorkspace } from "@/features/workspace/hooks/use-model-overrides-workspace";
import { SortableItem } from "./SortableItem";

export function OverrideEditor() {
  const { overrides, setOverrides } = useModelOverridesWorkspace();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log({ active, over, overrides });

    if (active.id !== over.id) {
      const oldIndex = overrides.findIndex(({ id }) => id === active.id);
      const newIndex = overrides.findIndex(({ id }) => id === over.id);

      console.log({ oldIndex, newIndex });

      setOverrides(arrayMove(overrides, oldIndex, newIndex));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={overrides}
          strategy={verticalListSortingStrategy}
        >
          {overrides.map((override, index) => (
            <SortableItem key={override.id} index={index} override={override} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
