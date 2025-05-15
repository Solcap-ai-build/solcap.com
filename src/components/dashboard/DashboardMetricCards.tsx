
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
          <div className="text-2xl font-bold">₦45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 new this month</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total POs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">43</div>
          <p className="text-xs text-muted-foreground">8 pending approval</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Funding Approved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦268,500</div>
          <p className="text-xs text-muted-foreground">For 27 purchase orders</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Credit Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦175,000</div>
          <p className="text-xs text-muted-foreground">14 days remaining</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetricCards;
