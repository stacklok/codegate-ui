import { isEqual } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";

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
  const memoizedInitialValues = useDeepMemo(initialValues);
  // this could be replaced with some form library later
  const [values, setValues] = useState<Values>(memoizedInitialValues);

  const updateFormValues = useCallback((newState: Partial<Values>) => {
    setValues((prevState: Values) => {
      if (isEqual(newState, prevState)) return prevState;
      return { ...prevState, ...newState };
    });
  }, []);

  const resetForm = useCallback(() => {
    setValues(memoizedInitialValues);
  }, [memoizedInitialValues]);

  const isDirty = useMemo(
    () => !isEqual(values, initialValues),
    [values, initialValues],
  );

  const formState = useMemo(
    () => ({ values, updateFormValues, resetForm, isDirty }),
    [values, updateFormValues, resetForm, isDirty]
  )

  return formState
}
