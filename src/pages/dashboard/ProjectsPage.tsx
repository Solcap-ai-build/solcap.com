
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban } from 'lucide-react';
import { ProjectsEmpty } from '@/components/empty-states';
import { Button } from '@/components/ui/button';
import Modal from '@/components/dashboard/addProjectModal';
import { useAuth } from '@/context/AuthContext';

const ProjectsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const { user, hasCompletedOnboarding } = useAuth();

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
          <CardTitle>All Projects (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsEmpty onCreateProject={() => setModalOpen(true)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
