import { FormState } from "@/hooks/useFormState";
import { Button } from "@stacklok/ui-kit";
import { FlipBackward } from "@untitled-ui/icons-react";

type Props<T> = {
  canSubmit: boolean;
  formErrorMessage?: string;
  formState: FormState<T>;
};
export function FormButtons<T>({
  formErrorMessage,
  formState,
  canSubmit,
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
      <Button isDisabled={!canSubmit || !formState.isDirty} type="submit">
        Save
      </Button>
    </div>
  );
}
