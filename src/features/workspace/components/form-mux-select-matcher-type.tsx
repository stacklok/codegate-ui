import { MuxMatcherType } from '@/api/generated'
import { FormSelect, SelectButton } from '@stacklok/ui-kit'
import { getMuxFieldName } from '../lib/get-mux-field-name'

export function FormMuxComboboxModel({ index }: { index: number }) {
  return (
    <FormSelect
      aria-label="Matcher type"
      items={[
        {
          id: MuxMatcherType.CATCH_ALL,
          textValue: 'Catch-all',
        },
        {
          id: MuxMatcherType.FILENAME_MATCH,
          textValue: 'Filename',
        },
        {
          id: MuxMatcherType.REQUEST_TYPE_MATCH,
          textValue: 'Request type',
        },
      ]}
      name={getMuxFieldName({
        index,
        field: 'matcher_type',
      })}
    >
      <SelectButton />
    </FormSelect>
  )
}
