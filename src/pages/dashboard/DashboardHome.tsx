
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  CreditCard, 
  Package, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import BusinessMetrics from '@/components/analytics/BusinessMetrics';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardMetricCards from '@/components/dashboard/DashboardMetricCards';

const DashboardHome = () => {
  const { user } = useAuth();

  const checkOnboardingStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('business_onboarding')
        .select('status')
        .eq('user_id', user.id)
        .single();

        if (!data){
          console.log("error------------", error)
          // window.location.href = "/onboarding"
        }

    } catch (error) {
      console.error('Error in checkOnboardingStatus:', error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, [user]);

  const recentActivities = [
    {
      id: 1,
      action: 'Payment received',
      amount: '₦150,000',
      time: '2 hours ago',
      status: 'completed',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    },
    {
      id: 2,
      action: 'Loan application submitted',
      amount: '₦500,000',
      time: '1 day ago',
      status: 'pending',
      icon: <Clock className="h-4 w-4 text-yellow-600" />
    },
    {
      id: 3,
      action: 'Inventory updated',
      amount: '25 items',
      time: '2 days ago',
      status: 'completed',
      icon: <Package className="h-4 w-4 text-blue-600" />
    },
    {
      id: 4,
      action: 'Credit limit increased',
      amount: '₦1,000,000',
      time: '3 days ago',
      status: 'completed',
      icon: <TrendingUp className="h-4 w-4 text-green-600" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-solar-green-600 to-solar-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-solar-green-100 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Metrics Cards */}
      {/* <BusinessMetrics /> */}
      <DashboardMetricCards/>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest business activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.icon}
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{activity.amount}</p>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Apply for Loan
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Add Inventory Item
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Important Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-sm">Loan application under review</p>
                <p className="text-xs text-muted-foreground">
                  Your recent loan application is being processed. You'll receive an update within 24-48 hours.
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Package className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-sm">Low inventory alert</p>
                <p className="text-xs text-muted-foreground">
                  3 items in your inventory are running low. Consider restocking soon.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
