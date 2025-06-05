
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const BusinessMetrics = (data) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Fetch transactions for revenue calculation
      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount, type, created_at')
        .eq('user_id', user.id);

      // For now, we'll use placeholder data since the inventory_items and loan_applications
      // tables might not be fully set up yet in the database types
      const totalRevenue = transactions?.reduce((sum, t) => {
        return t.type === 'credit' ? sum + Number(t.amount) : sum;
      }, 0) || 0;

      // Placeholder values for now
      const inventoryValue = data.totalInvAmount; // Placeholder
      const pendingLoans = 0; // Placeholder
      const approvedLoans = 0; // Placeholder

      const metricsData: MetricData[] = [
        {
          title: 'Total Revenue',
          value: new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(totalRevenue),
          change: '+12.5%',
          trend: 'up',
          icon: <DollarSign className="h-4 w-4" />
        },
        {
          title: 'Inventory Value',
          value: new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(inventoryValue),
          change: '+5.2%',
          trend: 'up',
          icon: <Package className="h-4 w-4" />
        },
        {
          title: 'Active Loans',
          value: approvedLoans.toString(),
          change: pendingLoans > 0 ? `${pendingLoans} pending` : 'No pending',
          trend: pendingLoans > 0 ? 'neutral' : 'up',
          icon: <CreditCard className="h-4 w-4" />
        },
        {
          title: 'Credit Utilization',
          value: '45%',
          change: '-8.1%',
          trend: 'down',
          icon: <TrendingUp className="h-4 w-4" />
        }
      ];

      setMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <TrendingUp className="h-3 w-3 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className={`text-xs flex items-center ${getTrendColor(metric.trend)}`}>
              {getTrendIcon(metric.trend)}
              <span className="ml-1">{metric.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessMetrics;
