import { FormState } from '@/hooks/useFormState'
import { Button } from '@stacklok/ui-kit'
import { FlipBackward } from '@untitled-ui/icons-react'

type Props<T> = {
  canSubmit: boolean
  formErrorMessage?: string
  formSideNote?: string
  formState: FormState<T>
  children?: React.ReactNode
  isPending: boolean
}
export function FormButtons<T>({
  formErrorMessage,
  formState,
  canSubmit,
  isPending,
  children,
  formSideNote,
}: Props<T>) {
  return (
    <div className="flex items-center gap-2">
      {formSideNote && <div className="p-1 text-secondary">{formSideNote}</div>}
      {formErrorMessage && (
        <div className="p-1 text-red-700">{formErrorMessage}</div>
      )}
      {formState.isDirty && (
        <Button variant="tertiary" onPress={formState.resetForm}>
          <FlipBackward />
          Revert changes
        </Button>
      )}
      {children}
      <Button
        isPending={isPending}
        isDisabled={!canSubmit || !formState.isDirty || isPending}
        type="submit"
      >
        Save
      </Button>
    </div>
  )
}
