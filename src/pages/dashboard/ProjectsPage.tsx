
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban } from 'lucide-react';
import { ProjectsEmpty } from '@/components/empty-states';
import { Button } from '@/components/ui/button';
import Modal from '@/components/dashboard/addProjectModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Trash } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Project {
  created_at: string
  id: string
  name: string
  status: string
  description: string
  updated_at: string
  owner_id: string
}

const ProjectsPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProject = async () => {
    if (!user) return;

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
    fetchProject();
  }, [projects, user]);

  const handleDeleteProject = async (id) => {
    if (!user) return;

    try {
      const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error.message);
      }

    toast({
        title: "project Deleted",
        description: `project has been deleted successfully!!`,
    });

    } catch (error) {
      console.error('Error in deleting project:', error);
    }

  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <FolderKanban className="mr-2 h-6 w-6" /> Projects
        </h1>
        <Button onClick={(e) => setModalOpen(true)} className='bg-solar-green-600 hover:bg-solar-green-700'>Create Project</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
      />


      <Card>
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0

            ? <>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-6 border rounded-lg space-y-4 relative">

                    {/* Delete Icon Button */}
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      title="Delete project"
                    >
                      <Trash size={18} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Project Name</p>
                        <p className="font-medium">{project.name}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">{project.status}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Created Date</p>
                        <p className="font-medium">
                          {new Date(project.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Total Clients</p>
                        <p className="font-medium">1</p>
                      </div>



                    </div>
                  </div>
                ))}
              </div>

            </>
            : <ProjectsEmpty onCreateProject={() => setModalOpen(true)} />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
