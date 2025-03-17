import { Button } from '@stacklok/ui-kit'
import { Trash01 } from '@untitled-ui/icons-react'
import { useFormMuxRulesContext } from './form-mux-context-provider'
import { FieldValuesMuxRow } from '../lib/schema-mux'
import { MuxMatcherType } from '@/api/generated'

export function FormMuxButtonDeleteRow({
  index,
  row,
  isDisabled,
}: {
  index: number
  row: FieldValuesMuxRow & { id: string }
  isDisabled: boolean
}) {
  const { remove } = useFormMuxRulesContext()

  return (
    <Button
      aria-label="Delete"
      isIcon
      isDisabled={row.matcher_type === MuxMatcherType.CATCH_ALL || isDisabled}
      variant="secondary"
      onPress={() => remove(index)}
    >
      <Trash01 />
    </Button>
  )
}
