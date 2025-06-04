
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban } from 'lucide-react';
import { ProjectsEmpty } from '@/components/empty-states';

const ProjectsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <FolderKanban className="mr-2 h-6 w-6" /> Projects
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsEmpty onCreateProject={() => console.log('Creating project...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
