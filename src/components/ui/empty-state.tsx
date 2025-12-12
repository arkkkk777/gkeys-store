import * as React from "react"
import { cn } from "@/lib/utils"
import { ShoppingCart, Heart } from "lucide-react"
import type { EmptyStateProps } from "@/types/design-system"
import { Button } from "./button"

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, message, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-design-xl text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-design-md text-design-text-muted">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-design-text mb-design-sm">
          {title}
        </h3>
        {message && (
          <p className="text-sm text-design-text-secondary mb-design-md max-w-md">
            {message}
          </p>
        )}
        {action && (
          <div className="mt-design-sm">
            {action}
          </div>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

// EmptyCart variant
export const EmptyCart = React.forwardRef<HTMLDivElement, Omit<EmptyStateProps, 'icon' | 'title' | 'message'>>(
  ({ action, ...props }, ref) => {
    return (
      <EmptyState
        ref={ref}
        icon={<ShoppingCart className="h-12 w-12" />}
        title="Your cart is empty"
        message="Add items to your cart to get started"
        action={action || <Button variant="primary">Browse Games</Button>}
        {...props}
      />
    )
  }
)
EmptyCart.displayName = "EmptyCart"

// EmptyWishlist variant
export const EmptyWishlist = React.forwardRef<HTMLDivElement, Omit<EmptyStateProps, 'icon' | 'title' | 'message'>>(
  ({ action, ...props }, ref) => {
    return (
      <EmptyState
        ref={ref}
        icon={<Heart className="h-12 w-12" />}
        title="Your wishlist is empty"
        message="Add games to your wishlist to save them for later"
        action={action || <Button variant="primary">Browse Games</Button>}
        {...props}
      />
    )
  }
)
EmptyWishlist.displayName = "EmptyWishlist"

export { EmptyState }
