
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

        {/* Solution Pages */}
        <Route path="/working-capital" element={<WorkingCapital />} />
        <Route path="/solutions/inventory-financing" element={<InventoryFinancing />} />

        
        {/* Catch-all route */}
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
