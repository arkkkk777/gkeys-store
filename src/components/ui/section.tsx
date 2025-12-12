import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'surface' | 'surfaceLight' | 'transparent'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = 'lg', spacing, background = 'default', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(className)}
        {...props}
      >
        <Container padding={padding} spacing={spacing} background={background}>
          {children}
        </Container>
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
