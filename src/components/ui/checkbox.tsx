"use client"

import * as React from "react"
import { Check } from "lucide-react"

export interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, checked, onCheckedChange, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <div
          className={`h-4 w-4 rounded border border-gray-300 bg-white flex items-center justify-center cursor-pointer ${
            checked ? "bg-blue-600 border-blue-600" : ""
          } ${className}`}
          onClick={() => onCheckedChange?.(!checked)}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    )
  },
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
