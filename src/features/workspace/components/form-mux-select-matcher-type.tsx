import { MuxMatcherType } from '@/api/generated'
import { SelectButton } from '@stacklok/ui-kit'
import { getMuxFieldName } from '../lib/get-mux-field-name'
import { FormSelect } from './tmp/form-select'
import { FieldValuesMuxRow } from '../lib/schema-mux'

export function FormSelectMatcherType({
  index,
  row,
}: {
  index: number
  row: FieldValuesMuxRow & { id: string }
}) {
  return (
    <FormSelect
      aria-label="Matcher type"
      items={[
        {
          id: MuxMatcherType.FILENAME_MATCH,
          textValue: 'FIM & Chat',
        },
        {
          id: MuxMatcherType.FIM_FILENAME,
          textValue: 'FIM',
        },
        {
          id: MuxMatcherType.CHAT_FILENAME,
          textValue: 'Chat',
        },
        {
          id: MuxMatcherType.CATCH_ALL,
          textValue: 'Catch-all',
        },
      ]}
      name={getMuxFieldName({
        field: 'matcher_type',
        index,
      })}
      isDisabled={row.matcher_type === MuxMatcherType.CATCH_ALL}
      disabledKeys={[MuxMatcherType.CATCH_ALL]}
      shouldShowValidationError={false}
    >
      <SelectButton />
    </FormSelect>
  )
}
