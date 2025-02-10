import type { ControlProps } from "@jsonforms/core";
import { Description, FieldError, Label } from "@stacklok/ui-kit";

export function getRACPropsFromJSONForms(props: ControlProps) {
  const { id, errors, required, enabled, handleChange, path, data } = props;

  return {
    isRequired: required,
    isInvalid: errors.length > 0,
    id: id,
    isDisabled: !enabled,
    onChange: (newValue: unknown) => handleChange(path, newValue),
    value: data,
  };
}

/**
 * Displays a `jsonforms` validation error if there is one.
 * Use when displaying the error in a different place
 * than the errors. Otherwise use <JsonFormsDescription />
 */
export function JsonFormsError({ errors }: ControlProps) {
  if (errors.length > 0) {
    return <FieldError className="mt-1">{errors}</FieldError>;
  }

  return null;
}

export function JsonFormsDescription(props: ControlProps) {
  const { description, errors } = props;

  if (errors.length > 0) {
    return <JsonFormsError {...props} />;
  }

  if ((description ?? "").length === 0) {
    return null;
  }

  return (
    <Description className="mt-2 text-secondary mb-4 text-base">
      {description}
    </Description>
  );
}

export function LabelWithDescription({
  label,
  isRequired = false,
  ...props
}: ControlProps & { isRequired?: boolean }) {
  return (
    <Label className="text-primary text-base mb-2 ">
      <div className="flex items-center">
        {label}{" "}
        {isRequired === true ? <span className="text-red-600">*</span> : null}
      </div>
      <JsonFormsDescription label={label} {...props} />
    </Label>
  );
}
