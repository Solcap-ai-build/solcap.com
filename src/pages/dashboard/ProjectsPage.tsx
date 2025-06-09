
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
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Folder,
  UsersIcon,
  TimerIcon
} from 'lucide-react';

interface Project {
  created_at: string
  id: string
  name: string
  status: string
  description: string
  updated_at: string
  owner_id: string
  teams: string
  start: string
  end: string
  client: string
}

const ProjectsPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

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
          <p className="mb-4">Manage your sollar installation projects.</p>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                    <div className="gap-4 space-y-4">
                      <div>
                        <h1 className="font-medium fw-bold text-xl md:text-2xl lg:text-3xl">{project.name}</h1>
                      </div>

                      <div>
                        <p className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          <span className="capitalize">{project.status}</span>
                        </p>
                      </div>

                      <div>
                        <p className="">{project.description}</p>
                      </div>


                      <div className='pt-3'>
                        <p className="text-gray-500 flex items-center space-x-1 px-2 py-1"><Folder className='mr-2' /> Client: {project.client}</p>
                        <p className="text-gray-500 flex items-center space-x-1 px-2 py-1"><TimerIcon className='mr-2' />
                          Timeline: 
                          <span className='ml-3'>{new Date(project.start).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })} -
                          {new Date(project.end).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                          </span>
                        </p>
                        <p className="text-gray-500 flex items-center space-x-1 px-2 py-1"><UsersIcon className='mr-2' /> Team: {project.teams} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <ProjectsEmpty onCreateProject={() => setModalOpen(true)} />
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
