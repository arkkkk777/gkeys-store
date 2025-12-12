import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    label?: string
  }
>(({ className, label, ...props }, ref) => (
  <>
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-design-border transition-design-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-primary focus-visible:ring-offset-2 focus-visible:ring-offset-design-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-design-primary data-[state=unchecked]:bg-design-surface",
        "min-h-[44px] min-w-[44px] design-mobile:min-h-[44px]",
        className
      )}
      aria-label={label}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-design-background shadow-design-md ring-0 transition-design-transform",
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
    {label && (
      <label className="ml-2 text-sm text-design-text cursor-pointer" onClick={() => !props.disabled && props.onCheckedChange?.(!props.checked)}>
        {label}
      </label>
    )}
  </>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
