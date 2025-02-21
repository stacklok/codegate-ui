import {
  Button,
  ComboBoxButton,
  ComboBoxClearButton,
  ComboBoxFieldGroup,
  ComboBoxInput,
  FormComboBox,
  FormTextField,
  Input,
  Label,
  OptionsSchema,
  TextField,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  MUX_FIELD_NAME,
  WORKSPACE_CONFIG_FIELD_NAME,
  WorkspaceMuxFieldValues,
} from '../lib/workspace-config-schema'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import { ModelByProvider, MuxMatcherType, MuxRule } from '@/api/generated'
import { groupBy, map, uniqueId } from 'lodash'
import {
  BracketsSlash,
  DotsGrid,
  GridDotsTop,
  Plus,
  SearchMd,
  Trash01,
} from '@untitled-ui/icons-react'
import { tv } from 'tailwind-variants'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
import { twMerge } from 'tailwind-merge'

function getMuxComponentName({
  field,
  index,
}: {
  index: number
  field: (typeof MUX_FIELD_NAME)[keyof typeof MUX_FIELD_NAME]
}) {
  return `${MUX_FIELD_NAME}.${index}.${field}`
}

function groupModels(
  models: ModelByProvider[] = []
): OptionsSchema<'listbox'>[] {
  return map(groupBy(models, 'provider_name'), (items, providerName) => ({
    id: providerName,
    textValue: providerName,
    items: items.map((item) => ({
      id: `${item.provider_id}/${item.name}`,
      textValue: item.name,
    })),
  }))
}

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

function DndSortProvider<T extends { id: UniqueIdentifier }>({
  children,
  onDragEnd,
  items,
}: {
  children: ReactNode
  onDragEnd: (event: DragEndEvent) => void
  items: T[]
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
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

function DragHandle({ item }: { item: MuxRule & { id: string } }) {
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

function MuxRuleRow({
  index,
  item,
  models,
  hasDragDisabled,
}: {
  index: number
  item: MuxRule & { id: string }
  models: OptionsSchema<'listbox'>[]
  hasDragDisabled: boolean
}) {
  console.debug('👉 item:', item)

  const isCatchAll = item.matcher_type === MuxMatcherType.CATCH_ALL

  const { transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li className={twMerge(gridStyles(), 'mb-2')} style={style}>
      <FormTextField
        aria-label="Matcher"
        isDisabled={isCatchAll}
        // defaultValue={isCatchAll ? 'Catch-all' : undefined}
        defaultValue={item.id}
        name={getMuxComponentName({
          index,
          field: 'matcher',
        })}
      >
        <Input icon={isCatchAll ? undefined : <DragHandle item={item} />} />
      </FormTextField>

      <FormComboBox
        aria-label="Matcher"
        items={models}
        // isDisabled={isArchived || isDefaultRule}
        name={getMuxComponentName({
          index,
          field: 'model',
        })}
      >
        <ComboBoxFieldGroup>
          <ComboBoxInput
            icon={<SearchMd />}
            isBorderless
            placeholder="Type to search..."
          />
          <ComboBoxClearButton />
          <ComboBoxButton />
        </ComboBoxFieldGroup>
      </FormComboBox>
      <Button
        aria-label="Delete"
        isIcon
        isDisabled
        isDestructive
        variant="secondary"
        // onPress={() => removeRule(index)}
      >
        <Trash01 />
      </Button>
    </li>
  )
}

export function WorkspaceMuxesFieldsArray() {
  const { control } = useFormContext()

  const { fields, swap, prepend } = useFieldArray({
    control,
    name: WORKSPACE_CONFIG_FIELD_NAME.muxing_rules,
  })

  const { data: models = [] } = useQueryListAllModelsForAllProviders({
    select: groupModels,
  })

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
      <DndSortProvider items={fields} onDragEnd={onDragEnd}>
        <ul>
          {fields.map((item, index) => (
            <MuxRuleRow
              index={index}
              key={item.id}
              item={item}
              models={models}
            />
          ))}
        </ul>
      </DndSortProvider>

      <div className="flex gap-2">
        <Button
          className="w-fit"
          variant="tertiary"
          onPress={() => prepend({ id: uniqueId() })}
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
