
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
  {
    name: "Wireless Earbuds",
    sales: 154,
  },
  {
    name: "Smart Watch",
    sales: 143,
  },
  {
    name: "Fitness Tracker",
    sales: 98,
  },
  {
    name: "Premium Backpack",
    sales: 87,
  },
  {
    name: "Phone Charger",
    sales: 65,
  },
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
          {payload[0].value} units
        </p>
      </div>
    );
  }

  return null;
};

export function TopProductsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>The best selling products this month</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 0,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sales" 
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
