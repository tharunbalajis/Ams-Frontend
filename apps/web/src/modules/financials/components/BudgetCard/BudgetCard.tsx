import { Badge, Card, CardContent, CardHeader, CardTitle, Progress } from '@ams/ui';
import { BUDGET_STATUS_COLOR, BUDGET_UTILIZATION_THRESHOLDS } from '../../constants/budget.constants';
import type { Budget } from '../../types/budget.types';

export interface BudgetCardProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const statusVariant = BUDGET_STATUS_COLOR[budget.status] as 'success' | 'secondary' | 'outline' | 'destructive';
  const progressVariant =
    budget.utilization >= BUDGET_UTILIZATION_THRESHOLDS.CRITICAL ? 'destructive' :
    budget.utilization >= BUDGET_UTILIZATION_THRESHOLDS.WARNING   ? 'warning'     : 'default';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{budget.period}</CardTitle>
          <p className="text-xs text-muted-foreground">{budget.fiscalYear}</p>
        </div>
        <Badge variant={statusVariant}>{budget.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Utilization</span>
            <span className={budget.utilization >= BUDGET_UTILIZATION_THRESHOLDS.WARNING ? 'font-semibold text-destructive' : 'font-semibold'}>
              {budget.utilization.toFixed(1)}%
            </span>
          </div>
          <Progress value={budget.utilization} variant={progressVariant} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Budget</p>
            <p className="font-semibold">₹{budget.totalBudget.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Spent</p>
            <p className="font-semibold text-destructive">₹{budget.totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Remaining</p>
            <p className="font-semibold text-green-600">₹{budget.remaining.toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-1">
          {budget.lineItems.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-xs">
              <span className="capitalize text-muted-foreground">{item.category.replace('_', ' ')}</span>
              <span>₹{item.spent.toLocaleString()} / ₹{item.budgeted.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
