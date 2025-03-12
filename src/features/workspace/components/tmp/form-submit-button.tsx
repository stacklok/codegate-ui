import { Button } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useFormState } from 'react-hook-form'

export function FormSubmitButton({
  children = 'Submit',
  variant = 'primary',
  ...props
}: ComponentProps<typeof Button>) {
  const { isSubmitting, isValidating, isDirty } = useFormState()

  return (
    <Button
      {...props}
      variant={variant}
      type="submit"
      isDisabled={isDirty === false}
      isPending={
        props.isPending === true ||
        isSubmitting === true ||
        isValidating === true
      }
    >
      {children}
    </Button>
  )
}
