import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-design-lg text-sm font-semibold transition-design-all disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-design-primary data-[state=on]:text-black [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2 focus-visible:ring-offset-design-background whitespace-nowrap shadow-sm bg-design-surface text-design-text hover:bg-design-surface-hover",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-design-border bg-design-surface hover:bg-design-surface-hover",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-3.5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
