import { FieldError, RadioGroup } from '@stacklok/ui-kit'
import type { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

/**
 * A `FormRadioGroup` connects a `RadioGroup` to a `Form` component using `react-hook-form`.
 *
 * [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/RadioGroup.html)
 */
export function FormRadioGroup({
  children,
  ...props
}: ComponentProps<typeof RadioGroup>) {
  if (props.name == null) throw new Error('FormRadioGroup requires a name prop')

  const { control } = useFormContext()

  const {
    field: {
      disabled: isDisabledByForm,
      name,
      onBlur,
      onChange,
      ref,
      value = '',
    },
    fieldState: { error, invalid },
  } = useController({
    control,
    defaultValue: props.value ?? props.defaultValue,
    name: props.name,
  })

  return (
    <RadioGroup
      {...props}
      defaultValue={value}
      isDisabled={isDisabledByForm || props.isDisabled}
      isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onChange={(k) => {
        onChange(k)
        props.onChange?.(k)
      }}
      ref={ref}
      value={undefined} // react-hook-form relies on uncontrolled component
      validationBehavior="aria" // Let react-hook-form handle validation
    >
      {(renderProps) => {
        return (
          <>
            {typeof children === 'function' ? children(renderProps) : children}
            <FieldError>{error?.message}</FieldError>
          </>
        )
      }}
    </RadioGroup>
  )
}
