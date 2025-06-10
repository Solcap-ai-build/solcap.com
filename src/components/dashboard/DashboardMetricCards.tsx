
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardMetricCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦0.00</div>
          <p className="text-xs text-muted-foreground">+00.0% from last month</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">+0 new this month</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total POs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">0 pending approval</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Funding Approved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦0.00</div>
          <p className="text-xs text-muted-foreground">For 0 purchase orders</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Credit Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦0.00</div>
          <p className="text-xs text-muted-foreground">29 days remaining</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetricCards;
