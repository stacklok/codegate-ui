import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

type Props<T> = {
  children: (item: T, index: number) => React.ReactNode;

  setItems: (items: T[]) => void;
  items: T[];
};

function ItemWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: UniqueIdentifier;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div style={style} className="flex items-center gap-2 w-full">
      <div ref={setNodeRef} {...attributes} {...listeners} className="size-8">
        <GripVertical className="size-full" />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}

export function SortableArea<T extends { id: UniqueIdentifier }>({
  children,
  setItems,
  items,
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over == null) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(({ id }) => id === active.id);
      const newIndex = items.findIndex(({ id }) => id === over.id);

      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <ItemWrapper key={index} id={item.id}>
            {children(item, index)}
          </ItemWrapper>
        ))}
      </SortableContext>
    </DndContext>
  );
}
