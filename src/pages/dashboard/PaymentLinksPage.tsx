
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { PaymentLinksEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/PaymentLinkModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Trash } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const PaymentLinksPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Link className="mr-2 h-6 w-6" /> Payment Links
        </h1>
        <Button onClick={(e) => setModalOpen(true)} className='bg-solar-green-600 hover:bg-solar-green-700'>Create payment link</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
      />

      <Card>
        <CardHeader>
          <CardTitle>Payment Links (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentLinksEmpty onCreateLink={() => setModalOpen(true)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinksPage;
