import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-design-lg text-base font-semibold transition-design-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2 focus-visible:ring-offset-design-background shadow-card min-h-[46px] min-w-[46px] design-mobile:min-h-[48px] design-tablet:min-h-[44px]",
  {
    variants: {
      variant: {
        primary: "bg-design-primary text-black hover:bg-design-primary-dark focus-visible:ring-design-primary/50",
        secondary: "bg-design-surface text-design-text hover:bg-design-surface-hover focus-visible:ring-design-primary/50 border border-design-border",
        ghost: "bg-design-surface/60 text-design-text hover:bg-design-surface-hover focus-visible:ring-design-primary/50",
        outline: "border border-design-border bg-transparent text-design-text hover:bg-design-surface focus-visible:ring-design-primary/50",
        default: "bg-design-primary text-black hover:bg-design-primary-dark focus-visible:ring-design-primary/50",
        destructive:
          "bg-design-error text-white hover:bg-design-error/90 focus-visible:ring-design-error/50",
        link: "text-design-primary underline-offset-4 hover:underline focus-visible:ring-0 shadow-none",
      },
      size: {
        sm: "h-10 rounded-design-md gap-1.5 px-design-md py-2 text-sm has-[>svg]:px-3",
        md: "h-11 rounded-design-lg gap-2 px-design-lg py-2.5 text-base has-[>svg]:px-3.5",
        lg: "h-12 rounded-design-lg gap-2.5 px-design-xl py-3 text-base has-[>svg]:px-4",
        default: "h-11 rounded-design-lg gap-2 px-design-lg py-2.5 text-base has-[>svg]:px-3.5",
        icon: "size-11",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  fullWidth,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
    fullWidth?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full"
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex items-center" aria-hidden="true">{icon}</span>}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
