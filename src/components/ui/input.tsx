import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  error?: string | boolean
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, fullWidth = true, size = "md", ...props }, ref) => {
    const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
      sm: "h-10 text-sm px-design-md py-2 design-mobile:h-11 design-mobile:min-h-[44px]",
      md: "h-11 text-base px-design-lg py-2.5 design-mobile:h-12 design-mobile:min-h-[46px]",
      lg: "h-12 text-base px-design-xl py-3 design-mobile:h-13 design-mobile:min-h-[48px]",
    };

    return (
      <div className={fullWidth ? "w-full" : "inline-block"}>
        <input
          type={type}
          className={cn(
            "flex w-full rounded-design-lg border bg-design-surface text-design-text shadow-sm",
            "ring-offset-design-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-design-text",
            "placeholder:text-design-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-design-error focus-visible:ring-design-error" : "border-design-border",
            sizeClasses[size],
            className
          )}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && typeof error === 'string' ? `${props.id || 'input'}-error` : undefined}
          {...props}
        />
        {error && typeof error === 'string' && (
          <p id={`${props.id || 'input'}-error`} className="mt-1 text-sm text-design-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
