import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface PromoCodeSectionProps {
  value: string
  onChange: (value: string) => void
  onUse: () => void
  className?: string
}

export const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  value,
  onChange,
  onUse,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-base font-semibold text-design-text">
        Do you have a promo code?
      </h4>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Your promo code"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0"
        />
        <Button
          variant="secondary"
          onClick={onUse}
          disabled={!value.trim()}
        >
          Use
        </Button>
      </div>
    </div>
  )
}

export default PromoCodeSection
