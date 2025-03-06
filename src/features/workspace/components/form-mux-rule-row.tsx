import { MuxMatcherType } from '@/api/generated'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@stacklok/ui-kit'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { FormMuxComboboxModel } from './form-mux-combobox-model'
import { Trash01 } from '@untitled-ui/icons-react'
import { FormMuxTextFieldMatcher } from './form-mux-text-field-matcher'
import { FieldValuesMuxRow } from '../lib/schema-mux'

const gridStyles = tv({
  base: 'grid grid-cols-[2fr_1fr_2.5rem] items-center gap-2',
})

export function FormMuxRuleRow({
  index,
  item,
}: {
  index: number
  item: FieldValuesMuxRow
}) {
  const isCatchAll = item.matcher_type === MuxMatcherType.CATCH_ALL

  const { transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li className={twMerge(gridStyles(), 'mb-2')} style={style}>
      <FormMuxTextFieldMatcher
        key={item.id}
        item={item}
        isCatchAll={isCatchAll}
        index={index}
      />

      <FormMuxComboboxModel index={index} />
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
