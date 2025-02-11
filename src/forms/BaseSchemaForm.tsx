import type { JsonSchema, ValidationMode } from "@jsonforms/core";
import type {
  JsonFormsInitStateProps,
  JsonFormsReactProps,
} from "@jsonforms/react";
import { JsonForms } from "@jsonforms/react";

type FormProps = Omit<
  JsonFormsInitStateProps &
    JsonFormsReactProps & {
      validationMode?: ValidationMode;
      schema: JsonSchema;
      isDisabled?: boolean;
    },
  "readonly"
>;

export function BaseSchemaForm({ isDisabled = false, ...props }: FormProps) {
  return <JsonForms {...props} readonly={isDisabled} />;
}
