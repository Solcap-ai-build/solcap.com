
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Inventory {
  amount: number
  created_at: string
  id: string
  supplier_name: string
  description: string
  term: string
  updated_at: string
  user_id: string
  status: string
  invoice_number: string
}

const InventoryPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [financingAmount, setFinancingAmount] = useState('');
  const [financingTerm, setFinancingTerm] = useState('30');
  const [supplierName, setSupplierName] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const { user, hasCompletedOnboarding } = useAuth();
  const [totalInv, setTotalInv] = useState(0);
  const [totalCompletedInv, setTotalCompletedInv] = useState(0);
  const [totalRejectedInv, setTotalRejectedInv] = useState(0);
  const [totalActiveInv, setTotalActiveInv] = useState(0);
  const [totalInvAmount, setTotalInvAmount] = useState(0);

  // Mock data for inventory financing
  const inventoryStats = {
    averageProcessingTime: '24 hours'
  };

  const handleSubmitRequest = async () => {
    if (!financingAmount || !supplierName || !invoiceDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Financing request submitted",
      description: `Your request for ₦${parseInt(financingAmount).toLocaleString()} has been submitted for review`,
    });

    await supabase.from('inventories').insert({
      user_id: user.id,
      supplier_name: supplierName,
      invoice_number: "supplierName",
      description: invoiceDescription,
      amount: financingAmount,
      term: financingTerm,
      status: "active",
    });

    // Reset form
    setFinancingAmount('');
    setSupplierName('');
    setInvoiceDescription('');
    setFinancingTerm('30');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const fetchInventories = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('inventories')
        .select('*')
        .eq('user_id', user.id)
      setInventories(data)

    } catch (error) {
      console.error('Error in fetchInventories:', error);
    }
  };


  const fetchInventoryMetrics = async () => {
    if (!user) return;

    // Total count
    const { count: totalCount } = await supabase
      .from('inventories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    setTotalInv(totalCount)

    // Total amount
    const { data: totalAmountData } = await supabase
      .from('inventories')
      .select('amount')
      .eq('user_id', user.id)

    const totalAmount = totalAmountData?.reduce((sum, inv) => sum + inv.amount, 0) || 0
    setTotalInvAmount(totalAmount)

    // Count completed
    const { count: completedCount } = await supabase
      .from('inventories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed')

    setTotalCompletedInv(completedCount)

    // Count active
    const { count: activeCount } = await supabase
      .from('inventories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'active')
    setTotalActiveInv(activeCount)

    // Count rejected
    const { count: rejectedCount } = await supabase
      .from('inventories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'rejected')
    setTotalRejectedInv(rejectedCount)

  };

  useEffect(() => {
    fetchInventoryMetrics();
    fetchInventories();
  }, [inventories, user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6" /> Inventory Finance
        </h1>
        <Button
          onClick={() => setActiveTab('request')}
          className="bg-solar-green-600 hover:bg-solar-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="request">New Request</TabsTrigger>
        </TabsList>

        {/* finance metrcis */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Financed</p>
                    <p className="text-2xl font-bold">₦{totalInvAmount.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-solar-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Requests</p>
                    <p className="text-2xl font-bold">{totalActiveInv}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold">{totalCompletedInv}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Processing</p>
                    <p className="text-2xl font-bold">{inventoryStats.averageProcessingTime}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Financing Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {inventories.length > 0 ?
                <div className="space-y-4">
                  {inventories.slice(-3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-solar-green-100 rounded-full">
                          <Package className="h-4 w-4 text-solar-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{request.supplier_name}</p>
                          <p className="text-sm text-gray-500">{request.invoice_number}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold">₦{request.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{request.term} Days</p>
                        </div>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <>
                  <div className="text-center space-y-4 mt-10 mb-10 pt-10 pb-10">
                    <h3 className="font-bold">
                      Empty
                    </h3>
                    <p className="">You don't have any finance at the moment!!</p>
                  </div>
                </>
              }
            </CardContent>
          </Card>
        </TabsContent>

        {/* finance history*/}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Financing Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {inventories.length > 0 ?
                <div className="space-y-4">
                  {inventories.map((request) => (
                    <div key={request.id} className="p-6 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-solar-green-100 rounded-full">
                            <Package className="h-5 w-5 text-solar-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{request.supplier_name}</h3>
                            <p className="text-sm text-gray-500">Invoice: {request.invoice_number}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize font-medium">{request.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p className="font-bold text-lg">₦{request.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Term</p>
                          <p className="font-medium">{request.term} Days</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Request Date</p>
                          <p className="font-medium">
                            {new Date(request.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Due Date</p>
                          <p className="font-medium">
                            {new Date(new Date(request.created_at).getTime() + request.term * 24 * 60 * 60 * 1000)
                              .toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <>
                  <div className="text-center space-y-4 mt-10 mb-10 pt-10 pb-10">
                    <h3 className="font-bold">
                      Empty
                    </h3>
                    <p className="">You don't have any finance at the moment!!</p>
                  </div>
                </>
              }
            </CardContent>
          </Card>
        </TabsContent>

        {/* request finance */}
        <TabsContent value="request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Inventory Financing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplier-name">Supplier Name *</Label>
                    <Input
                      id="supplier-name"
                      placeholder="Enter supplier name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="financing-amount">Financing Amount (₦) *</Label>
                    <Input
                      id="financing-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={financingAmount}
                      onChange={(e) => setFinancingAmount(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="financing-term">Financing Term *</Label>
                    <Select value={financingTerm} onValueChange={setFinancingTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="45">45 Days</SelectItem>
                        <SelectItem value="60">60 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="invoice-description">Invoice Description *</Label>
                    <Textarea
                      id="invoice-description"
                      placeholder="Describe the inventory items and purpose"
                      value={invoiceDescription}
                      onChange={(e) => setInvoiceDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Invoice/Purchase Order</p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    <Button variant="outline" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {financingAmount && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium mb-3">Financing Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Financing Amount</p>
                      <p className="font-bold">₦{parseInt(financingAmount || '0').toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Term</p>
                      <p className="font-bold">{financingTerm} days</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Estimated Fee (2%)</p>
                      <p className="font-bold">₦{(parseInt(financingAmount || '0') * 0.02).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button
                  onClick={handleSubmitRequest}
                  className="bg-solar-green-600 hover:bg-solar-green-700"
                  disabled={!financingAmount || !supplierName || !invoiceDescription}
                >
                  Submit Request
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryPage;
