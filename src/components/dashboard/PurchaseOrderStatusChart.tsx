
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardData } from "@/data/dashboardData";

const PurchaseOrderStatusChart = () => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Purchase Order Status</CardTitle>
        <CardDescription>Distribution of purchase orders by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dashboardData.purchaseOrderStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {dashboardData.purchaseOrderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Orders`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          {dashboardData.purchaseOrderStatusData.map((status, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
              <span>{status.name}</span>
              <span className="font-medium ml-auto">{status.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderStatusChart;
