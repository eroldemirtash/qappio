import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              'w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200',
              'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'placeholder-gray-400',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-300 focus:ring-red-500 focus:border-red-300',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
