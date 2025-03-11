import { Button } from '@stacklok/ui-kit'
import { MuxMatcherType } from '@/api/generated'
import { Plus } from '@untitled-ui/icons-react'
import { useFormMuxRulesContext } from './form-mux-context-provider'

export function FormMuxButtonAddRow() {
  const { prepend } = useFormMuxRulesContext()

  return (
    <Button
      className="w-fit"
      variant="tertiary"
      onPress={() =>
        prepend({
          model: '',
          matcher: '',
          matcher_type: MuxMatcherType.FILENAME_MATCH,
        })
      }
    >
      <Plus /> Add Filter
    </Button>
  )
}
