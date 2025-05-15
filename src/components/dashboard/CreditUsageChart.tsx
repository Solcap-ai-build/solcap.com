
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { format } from "date-fns";

interface CreditUsageData {
  month: string;
  amount: number;
  isCurrentMonth?: boolean;
}

interface CreditUsageChartProps {
  data: CreditUsageData[];
  tooltipFormatter?: (value: number) => string;
}

const CreditUsageChart: React.FC<CreditUsageChartProps> = ({
  data,
  tooltipFormatter = (value) => `₦${value.toLocaleString()}`
}) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  
  // Mark current month in the data
  const processedData = data.map(item => ({
    ...item,
    isCurrentMonth: item.month === currentMonth
  }));
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-solar-green-600">
            Used: {tooltipFormatter(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Usage</CardTitle>
        <CardDescription>Total credit used each month</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => `₦${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="#d1fae5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditUsageChart;
