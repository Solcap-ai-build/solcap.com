
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { TeamEmpty } from '@/components/empty-states';
import Modal from '@/components/dashboard/addTeamsModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash } from "lucide-react";

interface Project {
  created_at: string
  id: string
  name: string
  status: string
  description: string
  updated_at: string
  owner_id: string
}

interface Teams {
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


const TeamPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const { toast } = useToast();

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

  const fetchTeams = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false })
      setTeams(data)

    } catch (error) {
      console.error('Error in fetchTeams:', error);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting team member:', error.message);
      }

      toast({
        title: "Team Member Deleted",
        description: `Team member has been deleted successfully!!`,
      });

    } catch (error) {
      console.error('Error in deleting team member:', error);
    }

  }

  // useEffect(() => {
  //   if (!user) return;

  //   fetchProject();
  // }, [user]);

  useEffect(() => {
    fetchTeams();
    fetchProject();
  }, [teams, user]);

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
          <CardTitle>Team Members ({teams.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {teams.length > 0

            ? <>

              <div className="space-y-4">
                {teams.map((teams) => (
                  <div key={teams.id} className="p-6 border rounded-lg space-y-4 relative">

                    {/* Delete Icon Button */}
                    <button
                      onClick={() => handleDeleteTeam(teams.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      title="Delete teams"
                    >
                      <Trash size={18} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Member Name</p>
                        <p className="font-medium">{teams.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email Address</p>
                        <p className="font-medium">{teams.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone Number</p>
                        <p className="font-medium">{teams.phone_number}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Position</p>
                        <p className="font-medium">{teams.position}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </>
            : <TeamEmpty onInviteMember={() => setModalOpen(true)} />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
