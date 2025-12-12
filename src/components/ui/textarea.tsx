import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    error?: string | boolean
    fullWidth?: boolean
  }
>(({ className, error, fullWidth = true, ...props }, ref) => {
  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-design-lg border bg-design-surface text-design-text shadow-sm",
          "px-design-lg py-3 text-base ring-offset-design-background",
          "placeholder:text-design-text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-design-error focus-visible:ring-design-error" : "border-design-border",
          className
        )}
        ref={ref}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-design-error">{error}</p>
      )}
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
