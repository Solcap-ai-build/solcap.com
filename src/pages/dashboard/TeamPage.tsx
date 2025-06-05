
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { TeamEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/addTeamsModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';


const TeamPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" /> Team
        </h1>
        <Button onClick={(e) => setModalOpen(true)} className='bg-solar-green-600 hover:bg-solar-green-700'>Add Team Member</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
      />

      <Card>
        <CardHeader>
          <CardTitle>Team Members (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamEmpty onInviteMember={() => setModalOpen(true)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
