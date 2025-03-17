import { DragEndEvent } from '@dnd-kit/core'
import { useCallback } from 'react'
import { FormMuxRuleRow } from './form-mux-rule-row'
import { DndSortProvider } from './form-mux-dnd-provider'
import { useFormMuxRulesContext } from './form-mux-context-provider'
import { FormMuxFieldsLabels } from './form-mux-fields-labels'

function getIndicesOnDragEnd(event: DragEndEvent): {
  from: number
  to: number
} | null {
  const { active, over } = event
  if (over == null || active.id == null || over.id == null) return null
  // If trying to drag over the last item, no-op
  if (
    over.data.current?.sortable.index >=
    over.data.current?.sortable.items.length - 1
  )
    return null

  return {
    from: active.data.current?.sortable.index,
    to: over.data.current?.sortable.index,
  }
}

export function FormMuxFieldsArray({ isDisabled }: { isDisabled: boolean }) {
  const { fields, move } = useFormMuxRulesContext()

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { from, to } = getIndicesOnDragEnd(event) || {}
      if (typeof from === 'number' && typeof to === 'number') move(from, to)
    },
    [move]
  )

  return (
    <>
      <FormMuxFieldsLabels />
      <DndSortProvider
        isDisabled={isDisabled}
        items={fields}
        onDragEnd={onDragEnd}
      >
        <ul>
          {fields.map((item, index) => (
            <FormMuxRuleRow
              index={index}
              key={item.id}
              row={item}
              isDisabled={isDisabled}
            />
          ))}
        </ul>
      </DndSortProvider>
    </>
  )
}
