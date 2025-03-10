import { FieldError, TextField } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

/**
 * A form text field connects a `TextField` to a `Form` component using `react-hook-form`.
 *
 * [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/TextField.html)
 */
export function FormTextField({
  children,
  shouldShowValidationError = true,
  ...props
}: ComponentProps<typeof TextField> & { shouldShowValidationError?: boolean }) {
  if (props.name == null) throw new Error('FormTextField requires a name prop')

  const { control } = useFormContext()

  const {
    field: { disabled: isDisabledByForm, name, onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({
    control,
    defaultValue: props.value ?? props.defaultValue,
    name: props.name,
  })

  return (
    <TextField
      {...props}
      isDisabled={isDisabledByForm || props.isDisabled}
      isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onChange={(v) => {
        onChange(v)
        props.onChange?.(v)
      }}
      ref={ref}
      validationBehavior="aria" // Let React Hook Form handle validation instead of the browser.
      value={value}
    >
      {(renderProps) => {
        return (
          <>
            {typeof children === 'function' ? children(renderProps) : children}
            {shouldShowValidationError ? (
              <FieldError>{error?.message}</FieldError>
            ) : null}
          </>
        )
      }}
    </TextField>
  )
}
