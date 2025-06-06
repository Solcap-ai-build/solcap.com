
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { TeamEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/addTeamsModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Project {
  created_at: string
  id: string
  name: string
  status: string
  description: string
  updated_at: string
  owner_id: string
}


const TeamPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      setProjects(data)

    } catch (error) {
      console.error('Error in fetchProject:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchProject();
  }, [user]);

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
        projects={projects}
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
