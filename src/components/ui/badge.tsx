import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-design-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-design-primary text-black hover:bg-design-primary-dark",
        secondary:
          "border-design-border bg-design-surface text-design-text hover:bg-design-surface-hover",
        success:
          "border-transparent bg-design-primary text-black",
        warning:
          "border-transparent bg-design-warning text-black",
        destructive:
          "border-transparent bg-design-error text-white hover:bg-design-error/90",
        outline: "border-design-border text-design-text",
        article:
          "border-transparent bg-design-primary text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
