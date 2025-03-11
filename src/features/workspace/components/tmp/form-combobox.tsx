import { ComboBox, FieldError, OptionsSchema } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

/**
 * A `FormComboBox` connects a `ComboBox` to a `Form` component using `react-hook-form`.
 *
 * [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/ComboBox.html)
 */
export function FormComboBox<
  T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>,
>({
  children,
  shouldShowValidationError = true,
  ...props
}: ComponentProps<typeof ComboBox<T>> & {
  shouldShowValidationError?: boolean
}) {
  if (props.name == null) throw new Error('FormComboBox requires a name prop')

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
    <ComboBox
      {...props}
      isDisabled={isDisabledByForm || props.isDisabled}
      isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onSelectionChange={(k) => {
        onChange(k)
        props.onSelectionChange?.(k)
      }}
      ref={ref}
      selectedKey={value}
      validationBehavior="aria" // Let React Hook Form handle validation instead of the browser.
    >
      {(rp) => {
        return (
          <>
            {typeof children === 'function' ? children(rp) : children}
            {shouldShowValidationError ? (
              <FieldError>{error?.message}</FieldError>
            ) : null}
          </>
        )
      }}
    </ComboBox>
  )
}
