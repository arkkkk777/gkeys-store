import * as React from "react"
import { cn } from "@/lib/utils"
import type { ContainerProps } from "@/types/design-system"

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padding = 'md', spacing, background = 'default', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-design-sm design-mobile:p-design-xs design-desktop:p-design-sm',
      md: 'p-design-md design-mobile:p-design-sm design-desktop:p-design-md',
      lg: 'p-design-lg design-mobile:p-design-md design-desktop:p-design-lg',
      xl: 'p-design-xl design-mobile:p-design-lg design-desktop:p-design-xl',
    };

    const spacingClasses = spacing ? {
      xs: 'gap-design-xs',
      sm: 'gap-design-sm',
      md: 'gap-design-md',
      lg: 'gap-design-lg',
      xl: 'gap-design-xl',
    }[spacing] : '';

    const backgroundClasses = {
      default: 'bg-design-background',
      surface: 'bg-design-surface',
      surfaceLight: 'bg-design-surface-light',
      transparent: 'bg-transparent',
    };

    return (
      <div
        ref={ref}
        className={cn(
          paddingClasses[padding],
          spacingClasses,
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export { Container }
