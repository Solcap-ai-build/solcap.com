
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  FileText,
  Package,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== "/admin/dashboard" && location.pathname.startsWith(path));
  };

  // Navigation items for admin
  const navItems = [
    {
      name: "Overview",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      path: "/admin/dashboard/transactions",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      name: "Loan Requests",
      path: "/admin/dashboard/loan-requests",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Inventory Finance",
      path: "/admin/dashboard/inventory-finance",
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: "Users",
      path: "/admin/dashboard/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Credit Evaluation",
      path: "/admin/dashboard/credit-evaluation",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/admin/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center text-white">
              <Logo size="small" />
              <span className="ml-2 font-semibold">Admin Panel</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-solar-green-500">{item.icon}</span>
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User profile and logout */}
          <div className="p-4 border-t border-gray-800 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-solar-green-500 flex items-center justify-center">
                <span className="font-semibold text-gray-900">
                  {user?.email?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-white border-gray-700 hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2 text-solar-green-500" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <div className="ml-4 md:ml-0 flex items-center">
            <ChevronLeft className="w-4 h-4 text-gray-500 mr-1" />
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
              Back to Home
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <span className="text-sm font-medium">Admin Dashboard</span>
          </div>
          
          <div className="ml-auto flex items-center">
            {user?.role === "admin" ? (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> Admin
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> Not Admin
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
