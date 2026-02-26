import React from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          className={cn(
            'w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-200',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {hint && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
