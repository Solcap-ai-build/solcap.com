
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const InsightsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>Key performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">Approval Rate</p>
            <p className="text-2xl font-bold">72%</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800">
            +4%
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">Avg. Processing Time</p>
            <p className="text-2xl font-bold">2.3 days</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
            -0.5
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium">Credit Utilization</p>
            <p className="text-2xl font-bold">70%</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-800">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
