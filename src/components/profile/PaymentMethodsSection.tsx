import * as React from "react"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface PaymentMethod {
  id: string
  label: string
}

export interface PaymentMethodsSectionProps {
  amount: string
  onAmountChange: (value: string) => void
  selectedMethod: string
  onMethodChange: (methodId: string) => void
  methods: PaymentMethod[]
  onProceed: () => void
  className?: string
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  amount,
  onAmountChange,
  selectedMethod,
  onMethodChange,
  methods,
  onProceed,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-base font-semibold text-design-text">
        Top up your balance
      </h4>
      
      <Input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="w-full mb-4"
      />

      <RadioGroup
        value={selectedMethod}
        onValueChange={onMethodChange}
        className="space-y-2 mb-4 max-h-[300px] overflow-y-auto"
      >
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center space-x-3 p-3 rounded-design-md hover:bg-design-surface/50 transition-colors min-h-[44px]"
          >
            <RadioGroupItem value={method.id} id={method.id} />
            <Label
              htmlFor={method.id}
              className="flex-1 cursor-pointer text-design-text font-normal"
            >
              {method.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        variant="primary"
        onClick={onProceed}
        disabled={!amount.trim() || !selectedMethod}
        className="w-full"
      >
        <ShoppingCart className="w-5 h-5" />
        Proceed to pay
      </Button>
    </div>
  )
}

export default PaymentMethodsSection
