import { CheckboxGroup, FieldError } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

/**
 * A `FormCheckboxGroup` connects a `CheckboxGroup` to a `Form` component using `react-hook-form`.
 *
 * [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html)
 */
export function FormCheckboxGroup({
  children,
  ...props
}: ComponentProps<typeof CheckboxGroup>) {
  if (props.name == null)
    throw new Error('FormCheckboxGroup requires a name prop')

  const { control } = useFormContext()

  const {
    field: { disabled: isDisabledByForm, name, onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({
    control,
    defaultValue: props.value ?? props.defaultValue ?? [],
    name: props.name,
  })

  return (
    <CheckboxGroup
      {...props}
      isDisabled={isDisabledByForm || props.isDisabled}
      isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onChange={(k) => {
        onChange(k)
        props.onChange?.(k)
      }}
      ref={ref}
      defaultValue={value}
      validationBehavior="aria" // Let React Hook Form handle validation instead of the browser.
    >
      {(renderProps) => {
        return (
          <>
            {typeof children === 'function' ? children(renderProps) : children}
            <FieldError>{error?.message}</FieldError>
          </>
        )
      }}
    </CheckboxGroup>
  )
}
