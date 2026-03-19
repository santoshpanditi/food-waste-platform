import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import type { FieldValues, Path } from 'react-hook-form'
import { Input } from './Input'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  type?: string
  placeholder?: string
  hint?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps<any>>(
  ({ name, label, type = 'text', placeholder, hint }, ref) => {
    const { control, formState } = useFormContext()
    const error = formState.errors[name]

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            label={label || name}
            placeholder={placeholder}
            hint={hint}
            error={error?.message as string}
          />
        )}
      />
    )
  }
)

FormField.displayName = 'FormField'

export { FormField }
