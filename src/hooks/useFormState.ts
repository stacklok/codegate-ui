import { isEqual } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";

export type FormState<T> = {
  values: T;
  updateFormValues: (newState: Partial<T>) => void;
  setInitialValues: (newState: T) => void;
  resetForm: () => void;
  isDirty: boolean;
};

export function useFormState<Values extends Record<string, unknown>>(
  initialValues: Values
): FormState<Values> {
  const memoizedInitialValues = useRef(initialValues);
  // this could be replaced with some form library later
  const [values, setValues] = useState<Values>(memoizedInitialValues.current);

  const setInitialValues = useCallback((newInitialValues: Values) => {
    memoizedInitialValues.current = newInitialValues;
    setValues(newInitialValues);
  }, []);

  const updateFormValues = useCallback((newState: Partial<Values>) => {
    setValues((prevState: Values) => {
      if (isEqual(newState, prevState)) return prevState;
      return { ...prevState, ...newState };
    });
  }, []);

  const resetForm = useCallback(() => {
    setValues(memoizedInitialValues.current);
  }, [memoizedInitialValues]);

  const isDirty = useMemo(
    () => !isEqual(values, memoizedInitialValues.current),
    [values, memoizedInitialValues],
  );

  const formState = useMemo(
    () => ({ values, updateFormValues, resetForm, isDirty, setInitialValues }),
    [values, updateFormValues, resetForm, isDirty, setInitialValues],
  );

  return formState
}
