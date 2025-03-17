import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

/**
 * A component that resets the form after a successful submission.
 * Used to test that form fields are reset after a successful submission.
 */
export function FormResetOnSubmit() {
  const {
    formState: { isSubmitSuccessful },
    reset,
  } = useFormContext()

  // It is recommended in the React Hook Form documentation to use `useEffect` to
  // handle side effects like resetting the form after a successful submission.
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return null
}
