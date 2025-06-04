
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import UserProfileForm from '@/components/profile/UserProfileForm';

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <User className="mr-2 h-6 w-6" /> Profile
        </h1>
      </div>

      <UserProfileForm />
    </div>
  );
};

export default ProfilePage;
