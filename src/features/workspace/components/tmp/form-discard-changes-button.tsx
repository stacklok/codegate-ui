import { Button } from '@stacklok/ui-kit'
import { FlipBackward } from '@untitled-ui/icons-react'
import type { ComponentProps } from 'react'
import { type FieldValues, useFormContext } from 'react-hook-form'

export function FormDiscardChangesButton<T extends FieldValues>({
  children = (
    <>
      <FlipBackward />
      Discard changes
    </>
  ),
  variant = 'tertiary',
  defaultValues,
  ...props
}: ComponentProps<typeof Button> & { defaultValues: T }) {
  const { reset, formState } = useFormContext<T>()
  const { isDirty, isValidating } = formState || {}

  return (
    <Button
      {...props}
      variant={variant}
      type="button"
      isDisabled={isDirty === false || isValidating}
      onPress={() => reset(defaultValues)}
    >
      {children}
    </Button>
  )
}
