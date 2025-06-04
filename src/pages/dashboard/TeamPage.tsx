
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { TeamEmpty } from '@/components/empty-states';

const TeamPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" /> Team
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamEmpty onInviteMember={() => console.log('Inviting team member...')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
