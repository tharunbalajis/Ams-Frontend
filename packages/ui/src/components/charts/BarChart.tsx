import * as React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../styles/theme';
import { CHART_COLORS, type ChartDataPoint, type ChartSeries } from './LineChart';

export interface BarChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xAxisKey: string;
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const tooltipStyle = {
  background: 'hsl(var(--popover))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  series,
  xAxisKey,
  height = 300,
  stacked = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
}) => (
  <div className={cn('w-full', className)}>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        {showTooltip && <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--muted))' }} />}
        {showLegend && <Legend />}
        {series.map((s, i) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.name ?? s.dataKey}
            fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            stackId={stacked ? 'stack' : undefined}
            radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  </div>
);

export { BarChart };
