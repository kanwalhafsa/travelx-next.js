import * as React from "react"

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  className?: string
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-gray-200 ${orientation === "horizontal" ? "h-px w-full" : "w-px h-full"} ${className}`}
      {...props}
    />
  ),
)
Separator.displayName = "Separator"

export { Separator }
