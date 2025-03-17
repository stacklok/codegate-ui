import { Button } from '@stacklok/ui-kit'
import { MuxMatcherType } from '@/api/generated'
import { Plus } from '@untitled-ui/icons-react'
import { useFormMuxRulesContext } from './form-mux-context-provider'

export function FormMuxButtonAddRow({ isDisabled }: { isDisabled: boolean }) {
  const { prepend } = useFormMuxRulesContext()

  return (
    <Button
      aria-label="Add filter"
      className="w-fit"
      variant="tertiary"
      isDisabled={isDisabled}
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
