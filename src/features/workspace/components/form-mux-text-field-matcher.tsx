import { FormTextField, Input } from '@stacklok/ui-kit'
import { getMuxFieldName } from '../lib/get-mux-field-name'
import { FormMuxDragToReorderButton } from './form-mux-drag-to-reorder-button'
import { FieldValuesMuxRow } from '../lib/schema-mux'

export function FormMuxTextFieldMatcher({
  index,
  isCatchAll,
  item,
}: {
  index: number
  isCatchAll: boolean
  item: FieldValuesMuxRow
}) {
  console.debug('👉 isCatchAll:', isCatchAll)
  return (
    <FormTextField
      aria-label="Matcher"
      isDisabled={isCatchAll}
      defaultValue={isCatchAll ? 'Catch-all' : undefined}
      name={getMuxFieldName({
        index,
        field: 'matcher',
      })}
    >
      <Input
        icon={
          isCatchAll ? undefined : <FormMuxDragToReorderButton item={item} />
        }
      />
    </FormTextField>
  )
}
