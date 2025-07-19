
import { SheetTriggerProps as RadixSheetTriggerProps } from "@radix-ui/react-sheet"

// Extend types for shadcn/ui SheetTrigger
declare module "@radix-ui/react-sheet" {
  export interface SheetTriggerProps extends RadixSheetTriggerProps {
    asChild?: boolean
  }
}

declare module "@/components/ui/sheet" {
  export interface SheetTriggerProps extends RadixSheetTriggerProps {
    asChild?: boolean
  }
}