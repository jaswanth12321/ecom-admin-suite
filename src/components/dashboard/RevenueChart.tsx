
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4000 },
  { name: 'Sep', revenue: 5200 },
  { name: 'Oct', revenue: 6000 },
  { name: 'Nov', revenue: 7000 },
  { name: 'Dec', revenue: 9800 },
];

const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm font-bold text-primary">
          ${payload[0].value?.toString()}
        </p>
      </div>
    );
  }

  return null;
};

export function RevenueChart() {
  const currentRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const previousRevenue = currentRevenue * 0.85; // Fictional previous total
  const percentageChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  const isPositive = percentageChange >= 0;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the current year
            </CardDescription>
          </div>
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-success mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
            )}
            <span className={isPositive ? "text-success" : "text-destructive"}>
              {isPositive ? "+" : "-"}{Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `$${value}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
