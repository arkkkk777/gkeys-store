import * as React from "react"
import { cn } from "@/lib/utils"
import type { OverlayProps } from "@/types/design-system"

const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, visible, onClose, blur = false, children, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          blur && "backdrop-blur-sm",
          "bg-black/50",
          className
        )}
        onClick={onClose}
        {...props}
      >
        <div
          className="relative z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  }
)
Overlay.displayName = "Overlay"

export { Overlay }
