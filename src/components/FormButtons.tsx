import { FormState } from "@/hooks/useFormState";
import { Button } from "@stacklok/ui-kit";
import { FlipBackward } from "@untitled-ui/icons-react";

type Props<T> = {
  canSubmit: boolean;
  formErrorMessage?: string;
  formState: FormState<T>;
  children?: React.ReactNode;
};
export function FormButtons<T>({
  formErrorMessage,
  formState,
  canSubmit,
  children,
}: Props<T>) {
  return (
    <div className="flex gap-2 items-center">
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
      <Button isDisabled={!canSubmit || !formState.isDirty} type="submit">
        Save
      </Button>
    </div>
  );
}
