"use client"

import type * as React from "react"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps {
  side?: "left" | "right" | "top" | "bottom"
  className?: string
  children: React.ReactNode
}

interface SheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  return (
    <>
      {children}
      {open && <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />}
    </>
  )
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ asChild, children }) => {
  return <>{children}</>
}

const SheetContent: React.FC<SheetContentProps> = ({ side = "right", className, children }) => {
  const sideClasses = {
    right: "right-0 top-0 h-full",
    left: "left-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  }

  return (
    <div className={`fixed z-50 bg-white shadow-lg ${sideClasses[side]} ${className}`}>
      <div className="p-4">{children}</div>
    </div>
  )
}

export { Sheet, SheetContent, SheetTrigger }
