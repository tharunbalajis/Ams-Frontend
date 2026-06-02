import * as React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../styles/theme';

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartSeries {
  dataKey: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
}

export interface LineChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xAxisKey: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(142 76% 36%)',
  'hsl(38 92% 50%)',
  'hsl(280 87% 65%)',
  'hsl(0 84% 60%)',
];

const tooltipStyle = {
  background: 'hsl(var(--popover))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  xAxisKey,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
}) => (
  <div className={cn('w-full', className)}>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
        {showLegend && <Legend />}
        {series.map((s, i) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name ?? s.dataKey}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={s.strokeWidth ?? 2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  </div>
);

export { LineChart, CHART_COLORS };
