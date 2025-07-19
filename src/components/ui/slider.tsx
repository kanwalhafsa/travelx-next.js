"use client"

import * as React from "react"

export interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, max, min, step, className, ...props }, ref) => {
    const handleChange = (index: number, newValue: number) => {
      const newValues = [...value]
      newValues[index] = newValue
      onValueChange(newValues)
    }

    return (
      <div className={`relative flex items-center space-x-2 ${className}`}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          {...props}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
