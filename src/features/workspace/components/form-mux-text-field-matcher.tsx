import { Input } from '@stacklok/ui-kit'
import { getMuxFieldName } from '../lib/get-mux-field-name'
import { FieldValuesMuxRow } from '../lib/schema-mux'
import { MuxMatcherType } from '@/api/generated'
import { FormTextField } from './tmp/form-text-field'

export function FormMuxTextFieldMatcher({
  index,
  row,
  isDisabled,
}: {
  index: number
  row: FieldValuesMuxRow & { id: string }
  isDisabled: boolean
}) {
  return (
    <FormTextField
      aria-label="Matcher"
      isDisabled={row.matcher_type === MuxMatcherType.CATCH_ALL || isDisabled}
      name={getMuxFieldName({
        field: 'matcher',
        index,
      })}
      shouldShowValidationError={false}
    >
      <Input placeholder="e.g. file glob patterns like *.py" />
    </FormTextField>
  )
}
