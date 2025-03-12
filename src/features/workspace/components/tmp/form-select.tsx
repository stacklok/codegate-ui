import { FieldError, OptionsSchema, Select } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

/**
 * A `FormSelect` connects a `Select` to a `Form` component using `react-hook-form`.
 *
 * [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/Select.html)
 */
export function FormSelect<
  T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>,
>({
  children,
  shouldShowValidationError = true,
  ...props
}: ComponentProps<typeof Select<T>> & { shouldShowValidationError?: boolean }) {
  if (props.name == null) throw new Error('FormSelect requires a name prop')

  const { control } = useFormContext()

  const {
    field: { disabled: isDisabledByForm, name, onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({
    control,
    defaultValue: props.selectedKey ?? props.defaultSelectedKey,
    name: props.name,
  })

  return (
    <Select
      {...props}
      defaultSelectedKey={value}
      isDisabled={isDisabledByForm || props.isDisabled}
      isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onSelectionChange={(k) => {
        onChange(k)
        props.onSelectionChange?.(k)
      }}
      ref={ref}
      selectedKey={undefined} // react-hook-form relies on uncontrolled component
      validationBehavior="aria" // Let react-hook-form handle validation
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
    </Select>
  )
}
