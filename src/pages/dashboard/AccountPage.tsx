
import React from "react";
import { Card } from "@/components/ui/card";
import CompanySettingsForm from "@/components/dashboard/CompanySettingsForm";

const AccountPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Company</h1>
      <p className="text-gray-500">Manage your company profile, bank details, and security settings.</p>
      
      <CompanySettingsForm />
    </div>
  );
};

export default AccountPage;
