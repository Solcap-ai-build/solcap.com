
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Store } from 'lucide-react';
import { CustomersEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/AddCustomersModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Trash } from "lucide-react";
import { useToast } from '@/hooks/use-toast';


interface Customer {
  created_at: string
  id: string
  name: string
  email: string
  phone_number: string
  updated_at: string
  parent_id: string
}

const CustomersPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomer = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false })
      setCustomers(data)

    } catch (error) {
      console.error('Error in fetchCustomer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!user) return;

    try {
      const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

      if (error) {
        console.error('Error deleting customer:', error.message);
      }

      toast({
        title: "Customer Deleted",
        description: `Customer has been deleted successfully!!`,
    });

    } catch (error) {
      console.error('Error in deleting customer:', error);
    }

  }

  useEffect(() => {
    fetchCustomer();
  }, [customers, user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Store className="mr-2 h-6 w-6" /> Customers
        </h1>
        <Button onClick={(e) => setModalOpen(true)} className='bg-solar-green-600 hover:bg-solar-green-700'>Add Customer</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
      />

      <Card>
        <CardHeader>
          <CardTitle>All Customers ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {customers.length > 0

            ? <>

              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="p-6 border rounded-lg space-y-4 relative">

                    {/* Delete Icon Button */}
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      title="Delete customer"
                    >
                      <Trash size={18} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Customer Name</p>
                        <p className="font-medium">{customer.name}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Customer Email Address</p>
                        <p className="font-medium">{customer.email}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Customer Phone Number</p>
                        <p className="font-medium">{customer.phone_number}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Added Date</p>
                        <p className="font-medium">
                          {new Date(customer.created_at).toLocaleDateString('en-US', {
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

            </>
            : <CustomersEmpty onAddCustomer={() => setModalOpen(true)} />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
