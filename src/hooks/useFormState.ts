import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type FormState<T> = {
  values: T
  updateFormValues: (newState: Partial<T>) => void
  resetForm: () => void
  isDirty: boolean
}

function useDeepMemo<T>(value: T): T {
  const ref = useRef<T>(value)
  if (!isEqual(ref.current, value)) {
    ref.current = value
  }
  return ref.current
}

export function useFormState<Values extends Record<string, unknown>>(
  initialValues: Values
): FormState<Values> {
  const memoizedInitialValues = useDeepMemo(initialValues)

  // this could be replaced with some form library later
  const [values, setValues] = useState<Values>(memoizedInitialValues)
  const [originalValues, setOriginalValues] = useState<Values>(values)

  useEffect(() => {
    // this logic supports the use case when the initialValues change
    // due to an async request for instance
    setOriginalValues(memoizedInitialValues)
    setValues(memoizedInitialValues)
  }, [memoizedInitialValues])

  const updateFormValues = useCallback((newState: Partial<Values>) => {
    setValues((prevState: Values) => ({
      ...prevState,
      ...newState,
    }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(originalValues)
  }, [originalValues])

  const isDirty = useMemo(
    () => !isEqual(values, originalValues),
    [values, originalValues]
  )

  const formState = useMemo(
    () => ({ values, updateFormValues, resetForm, isDirty }),
    [values, updateFormValues, resetForm, isDirty]
  )

  return formState
}
