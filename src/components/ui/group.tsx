import * as React from "react"
import { cn } from "@/lib/utils"

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'row' | 'column'
}

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ className, spacing = 'md', direction = 'row', children, ...props }, ref) => {
    const spacingClasses = {
      xs: 'gap-design-xs',
      sm: 'gap-design-sm',
      md: 'gap-design-md',
      lg: 'gap-design-lg',
      xl: 'gap-design-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === 'row' ? 'flex-row' : 'flex-col',
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Group.displayName = "Group"

export { Group }
