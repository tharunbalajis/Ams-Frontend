import { Button, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { useQuickActions } from '../../hooks/useQuickActions';

export function QuickActions() {
  const { actions, handleAction } = useQuickActions();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 pt-0">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant="outline"
            size="sm"
            className="h-9 justify-start text-left"
            onClick={() => handleAction(action.href)}
          >
            {action.label}
          </Button>
        ))}
        {actions.length === 0 && (
          <p className="text-xs text-muted-foreground">No actions available.</p>
        )}
      </CardContent>
    </Card>
  );
}
