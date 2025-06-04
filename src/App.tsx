
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import WorkingCapital from "./pages/solutions/WorkingCapital";
import InventoryFinancing from "./pages/solutions/InventoryFinancing";
import PricingPage from "./pages/Pricing";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyConfirm from "./pages/VerifyConfirm";
import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Pricing from "./pages/Pricing";

// Dashboard pags
import DashboardHome from "./pages/dashboard/DashboardHome";
import WalletPage from "./pages/dashboard/WalletPage";
import CreditPage from "./pages/dashboard/CreditPage";
import InventoryPage from "./pages/dashboard/InventoryPage";
import InvoicesPage from "./pages/dashboard/InvoicesPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import PaymentLinksPage from "./pages/dashboard/PaymentLinksPage";
import TeamPage from "./pages/dashboard/TeamPage";
import CustomersPage from "./pages/dashboard/CustomersPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SupportPage from "./pages/dashboard/SupportPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import CompanyPage from "./pages/dashboard/CompanyPage";
import ProjectsPage from "./pages/dashboard/ProjectsPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole = undefined,
  requiresOnboarding = false
}: { 
  children: React.ReactNode;
  requiredRole?: "admin" | "technician" | "user";
  requiresOnboarding?: boolean;
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to their appropriate dashboard if they don't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  // Add logic to check if user has completed onboarding
  // In a real app, you would have a flag in the user object
  // For now we'll just redirect all dashboard access to onboarding
  // if onboarding is not completed (demo purposes only)
  const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted") === "true";
  
  if (!hasCompletedOnboarding && !requiresOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const AppWithAuth = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/pricing" element={<PricingPage />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-confirm" element={<VerifyConfirm />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } 
        />

        <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
          <Route index element={<DashboardHome />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="credit" element={<CreditPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="payment-links" element={<PaymentLinksPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="company" element={<CompanyPage />} />
        </Route>
              

        <Route path="/solutions/working-capital" element={<WorkingCapital />} />
        <Route path="/solutions/inventory-financing" element={<InventoryFinancing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </TooltipProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
