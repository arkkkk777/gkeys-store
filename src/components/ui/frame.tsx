import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'surface' | 'surfaceLight' | 'transparent'
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ className, padding = 'md', spacing, background = 'surface', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-design-lg", className)}
        {...props}
      >
        <Container padding={padding} spacing={spacing} background={background}>
          {children}
        </Container>
      </div>
    )
  }
)
Frame.displayName = "Frame"

export { Frame }
