import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import type { FeedbackProps } from "@/types/design-system"

const Feedback = React.forwardRef<HTMLDivElement, FeedbackProps>(
  ({ className, type, message, dismissible, onDismiss, ...props }, ref) => {
    const typeClasses = {
      success: 'bg-design-success/10 border-design-success text-design-success',
      error: 'bg-design-error/10 border-design-error text-design-error',
      warning: 'bg-design-warning/10 border-design-warning text-design-warning',
      info: 'bg-design-surface border-design-border text-design-text',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-design-md rounded-design-md border p-design-md",
          typeClasses[type],
          className
        )}
        role="alert"
        {...props}
      >
        <p className="flex-1 text-sm">{message}</p>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto rounded-design-sm p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Feedback.displayName = "Feedback"

export { Feedback }
