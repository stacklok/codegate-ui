import { useSortable } from '@dnd-kit/sortable'
import { DotsGrid } from '@untitled-ui/icons-react'
import { FieldValuesMuxRow } from '../lib/schema-mux'
import { twMerge } from 'tailwind-merge'

export function FormMuxButtonDragToReorder({
  row,
}: {
  row: FieldValuesMuxRow & { id: string }
}) {
  const isDisabled = row.matcher === 'Catch-all'

  const {
    attributes,
    // @ts-expect-error - typedefs say `eventListeners` it is actually `listeners`
    listeners,
  } = useSortable({ id: row.id, disabled: isDisabled })
  return (
    <div
      {...attributes}
      {...listeners}
      className={twMerge(
        'size-10 p-1.5',
        'flex items-center justify-center',
        'pointer-events-auto rounded-sm',
        isDisabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-ns-resize hover:bg-gray-100 pressed:bg-gray-200'
      )}
    >
      <DotsGrid className="size-5" />
    </div>
  )
}
