import { isEqual } from "lodash";
import { useState } from "react";

export type FormState<T> = {
  values: T;
  updateFormValues: (newState: Partial<T>) => void;
  resetForm: () => void;
  isDirty: boolean;
};

export function useFormState<Values extends Record<string, unknown>>(
  initialValues: Values,
): FormState<Values> {
  // this could be replaced with some form library later
  const [values, setValues] = useState<Values>(initialValues);
  const updateFormValues = (newState: Partial<Values>) => {
    setValues((prevState: Values) => ({
      ...prevState,
      ...newState,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const isDirty = !isEqual(values, initialValues);

  return { values, updateFormValues, resetForm, isDirty };
}
