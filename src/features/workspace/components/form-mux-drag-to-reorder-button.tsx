import { useSortable } from '@dnd-kit/sortable'
import { DotsGrid } from '@untitled-ui/icons-react'
import { FieldValuesMuxRow } from '../lib/schema-mux'

export function FormMuxDragToReorderButton({
  item,
}: {
  item: FieldValuesMuxRow
}) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="pointer-events-auto rounded-sm p-1.5 hover:bg-gray-100 pressed:bg-gray-200"
    >
      <DotsGrid className="size-5" />
    </div>
  )
}
