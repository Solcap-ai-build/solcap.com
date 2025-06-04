
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { InvoicesEmpty } from '@/components/empty-states';

const InvoicesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" /> Invoices
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoicesEmpty onCreateInvoice={() => console.log('Creating invoice...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
