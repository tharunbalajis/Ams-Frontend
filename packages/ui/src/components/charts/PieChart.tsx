import * as React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../styles/theme';
import { CHART_COLORS } from './LineChart';

export interface PieChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  height?: number;
  innerRadius?: number;
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

const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  innerRadius = 0,
  showLegend = true,
  showTooltip = true,
  className,
}) => (
  <div className={cn('w-full', className)}>
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color ?? CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  </div>
);

export { PieChart };
