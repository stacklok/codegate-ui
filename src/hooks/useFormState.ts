import { isEqual } from "lodash";
import { useState } from "react";

export type FormState<T> = {
  formState: T;
  updateFormState: (newState: Partial<T>) => void;
  resetForm: () => void;
  isDirty: boolean;
};

export function useFormState<T extends Record<string, unknown>>(
  initialState: T,
): FormState<T> {
  // this could be replaced with some form library later
  const [formState, setFormState] = useState<T>(initialState);
  const updateFormState = (newState: Partial<T>) => {
    setFormState((prevState: T) => ({
      ...prevState,
      ...newState,
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const isDirty = !isEqual(formState, initialState);

  return { formState, updateFormState, resetForm, isDirty };
}
