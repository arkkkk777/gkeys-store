import * as React from "react"
import { cn } from "@/lib/utils"
import type { LinkProps as DesignLinkProps } from "@/types/design-system"

const Link = React.forwardRef<HTMLAnchorElement, DesignLinkProps>(
  ({ className, variant = 'default', icon, external, children, ...props }, ref) => {
    const variantClasses = {
      default: 'text-design-text hover:text-design-primary',
      primary: 'text-design-primary hover:text-design-primary-dark',
      muted: 'text-design-text-muted hover:text-design-text',
    };

    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 transition-design-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2",
          "min-h-[44px] min-w-[44px] design-mobile:min-h-[44px]",
          variantClasses[variant],
          className
        )}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {icon && <span className="inline-flex items-center" aria-hidden="true">{icon}</span>}
        {children}
      </a>
    )
  }
)
Link.displayName = "Link"

export { Link }
