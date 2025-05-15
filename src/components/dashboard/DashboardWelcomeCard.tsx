
import React from "react";
import { useAuth } from "@/context/AuthContext";

const DashboardWelcomeCard = () => {
  const { user } = useAuth();

  // Welcome message based on user role
  const getWelcomeMessage = () => {
    if (!user) return "Welcome to SolCap";
    
    switch (user.role) {
      case "admin":
        return `Welcome, ${user.name}. You have admin access to all system features.`;
      case "technician":
        return `Welcome, ${user.name}. You have access to inventory management features.`;
      case "user":
        return `Welcome, ${user.name}. You can manage your solar financing here.`;
      default:
        return `Welcome to SolCap, ${user.name}.`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-solar-green-700 mb-2">Dashboard</h2>
      <p className="text-gray-600">{getWelcomeMessage()}</p>
    </div>
  );
};

export default DashboardWelcomeCard;
