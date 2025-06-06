
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { InvoicesEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/addInvoiceModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash } from "lucide-react";


interface Business {
  name: string
  email: string
  id: string
  phone_number: string
  parent_id: string
  project_id: string
  position: string
  created_at: string
  updated_at: string
}


interface Invoice {
  name: string
  email: string
  id: string
  phone_number: string
  parent_id: string
  project_id: string
  position: string
  created_at: string
  updated_at: string
}

const InvoicesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [business, setBusiness] = useState<Business[]>([]);
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" /> Invoices
        </h1>
        <Button onClick={(e) => setModalOpen(true)} className='bg-solar-green-600 hover:bg-solar-green-700'>Create Invoice</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        business={business}
      />

      <Card>
        <CardHeader>
          <CardTitle>All Invoices (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoicesEmpty onCreateInvoice={() => setModalOpen(true)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
