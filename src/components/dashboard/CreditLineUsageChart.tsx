
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardData } from "@/data/dashboardData";

const CreditLineUsageChart = () => {
  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <CardTitle>Credit Line Usage</CardTitle>
        <CardDescription>Monthly credit line usage trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardData.creditUsageData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₦${value / 1000}k`} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Credit Used']} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditLineUsageChart;
