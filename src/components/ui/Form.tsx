import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { FieldValues, SubmitHandler, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema } from 'zod'

interface FormProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodSchema | any
  onSubmit: SubmitHandler<T>
  children: React.ReactNode
  className?: string
}

const Form = React.forwardRef<
  HTMLFormElement,
  FormProps<any>
>(({ schema, onSubmit, children, className, ...props }, ref) => {
  const methods = useForm({
    resolver: zodResolver(schema as any),
    ...props,
  })

  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  )
})

Form.displayName = 'Form'

export { Form }
export { useFormContext, Controller } from 'react-hook-form'
