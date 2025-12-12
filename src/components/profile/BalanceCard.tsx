import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export interface BalanceCardProps {
  balance: number
  className?: string
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  className
}) => {
  return (
    <Card className={cn("max-w-[400px]", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-design-text">
          Your Balance Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-design-text-secondary">Current balance</span>
          <span className="text-xl font-bold text-design-text">€{balance.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceCard
