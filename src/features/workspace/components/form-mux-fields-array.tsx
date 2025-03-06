import {
  Button,
  Label,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  WORKSPACE_CONFIG_FIELD_NAME,
  WorkspaceConfigFieldValues,
} from '../lib/schema-mux'
import { MuxMatcherType } from '@/api/generated'
import { uniqueId } from 'lodash'
import { Plus } from '@untitled-ui/icons-react'
import { tv } from 'tailwind-variants'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { ReactNode, useCallback } from 'react'
import { FormMuxRuleRow } from './form-mux-rule-row'
import { DndSortProvider } from './form-mux-dnd-provider'

function getIndicesOnDragEnd<T extends { id: UniqueIdentifier }>(
  event: DragEndEvent,
  items: T[]
): {
  from: number
  to: number
} | null {
  const { active, over } = event

  if (over == null || active.id || over.id) return null // no-op

  const from = items.findIndex(({ id }) => id === active.id)
  const to = items.findIndex(({ id }) => id === over.id)

  return {
    from,
    to,
  }
}

const gridStyles = tv({
  base: 'grid grid-cols-[2fr_1fr_2.5rem] items-center gap-2',
})

function Labels() {
  return (
    <div className={gridStyles()}>
      <Label className="flex items-center gap-1">
        Filter by
        <TooltipTrigger delay={0}>
          <TooltipInfoButton aria-label="Filter by description" />
          <Tooltip placement="right" className="max-w-72 text-balance">
            Filters are applied in top-down order. The first rule that matches
            each prompt determines the chosen model. An empty filter applies to
            all prompts.
          </Tooltip>
        </TooltipTrigger>
      </Label>
      <Label>Preferred model</Label>
    </div>
  )
}

export function FormMuxFieldsArray() {
  const { control } = useFormContext<WorkspaceConfigFieldValues>()

  const { fields, swap, prepend } = useFieldArray<WorkspaceConfigFieldValues>({
    control,
    name: WORKSPACE_CONFIG_FIELD_NAME.muxing_rules,
  })
  console.debug('👉 fields:', fields)

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { from, to } = getIndicesOnDragEnd(event, fields) || {}
      if (from && to) swap(from, to)
    },
    [fields, swap]
  )

  return (
    <>
      <Labels />
      <DndSortProvider key={fields.length} items={fields} onDragEnd={onDragEnd}>
        <ul>
          {fields.map((item, index) => {
            console.debug('👉 MAPPED item:', item)
            return <FormMuxRuleRow index={index} key={item.id} item={item} />
          })}
        </ul>
      </DndSortProvider>

      <div className="flex gap-2">
        <Button
          className="w-fit"
          variant="tertiary"
          onPress={() =>
            prepend({
              id: uniqueId(),
              model: undefined,
              matcher: '',
              matcher_type: MuxMatcherType.FILENAME_MATCH,
            })
          }
          // isDisabled={isArchived}
        >
          <Plus /> Add Filter
        </Button>

        {/* <LinkButton className="w-fit" variant="tertiary" href="/providers">
          <LayersThree01 /> Manage providers
        </LinkButton> */}
      </div>
    </>
  )
}
