import { useState } from 'react'
import toast from 'react-hot-toast'

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>(
    'idle'
  )
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = async () => {
    setStatus('pending')
    setValue(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setValue(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error as E)
      setStatus('error')
      throw error
    }
  }

  if (immediate) {
    execute()
  }

  return { execute, status, value, error }
}

export const useFormState = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const resetErrors = () => setErrors({})

  const handleSubmit = async <T,>(
    callback: () => Promise<T>,
    onSuccess?: (data: T) => void
  ) => {
    setLoading(true)
    resetErrors()
    try {
      const data = await callback()
      toast.success('Operation successful!')
      onSuccess?.(data)
      return data
    } catch (err: any) {
      const message = err?.response?.data?.message || 'An error occurred'
      toast.error(message)
      setErrors({ form: message })
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loading, errors, handleSubmit, resetErrors }
}
