import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'
import { FormMuxComboboxModel } from './form-mux-combobox-model'
import { FormMuxTextFieldMatcher } from './form-mux-text-field-matcher'
import { FieldValuesMuxRow } from '../lib/schema-mux'
import { FormSelectMatcherType } from './form-mux-select-matcher-type'
import { FormMuxButtonDragToReorder } from './form-mux-button-drag-to-reorder'
import { muxRowGridStyles } from '../lib/mux-row-grid-styles'
import { FormMuxButtonDeleteRow } from './form-mux-button-delete-rule'

export function FormMuxRuleRow({
  index,
  row,
}: {
  index: number
  row: FieldValuesMuxRow & { id: string }
}) {
  const { transform, transition, setNodeRef } = useSortable({ id: row.id })
  const style = {
    transform: CSS.Transform.toString({
      y: transform?.y || 0,
      scaleX: 1,
      scaleY: 1,
      x: 0,
    }),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      className={twMerge(muxRowGridStyles(), 'mb-2')}
      style={style}
    >
      <FormMuxButtonDragToReorder row={row} />
      <FormSelectMatcherType row={row} index={index} />
      <FormMuxTextFieldMatcher row={row} index={index} />
      <FormMuxComboboxModel index={index} />
      <FormMuxButtonDeleteRow row={row} index={index} />
    </li>
  )
}
