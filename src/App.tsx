
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
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
import AuthNavigationHandler from "@/components/auth/AuthNavigationHandler";
import SetupComplete from "./pages/SetupComplete";

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



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AuthNavigationHandler />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/verify-confirm" element={<VerifyConfirm />} />
              <Route path="/setup-complete" element={<SetupComplete />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Solution Pages */}
              <Route path="/solutions/working-capital" element={<WorkingCapital />} />
              <Route path="/solutions/inventory-financing" element={<InventoryFinancing />} />
              
              {/* Protected: Onboarding */}
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected: User Dashboard */}
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
                <Route path="projects" element={<ProjectsPage />} />
              </Route>
              
              {/* Protected: Admin Dashboard */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole={['admin', 'super-admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
