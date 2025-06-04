import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Banknote, // Changed from CircleDollarSign to Banknote for the Finance icon
  Wallet,
  CreditCard,
  Package,
  FileText,
  ArrowLeftRight,
  Link as LinkIcon,
  UserCircle,
  Store,
  BellRing, 
  FolderKanban,
  HelpCircle,
  LogOut, 
  ChevronLeft, 
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Dashboard layout component
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    finance: false,
    management: false,
    projects: false
  });

  // Check if the screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Set initial expanded state based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/wallet') || path.includes('/dashboard/credit') || 
        path.includes('/dashboard/inventory') || path.includes('/dashboard/invoices') || 
        path.includes('/dashboard/transactions') || path.includes('/dashboard/payment-links')) {
      setExpandedGroups(prev => ({ ...prev, finance: true }));
    } else if (path.includes('/dashboard/team') || path.includes('/dashboard/customers')) {
      setExpandedGroups(prev => ({ ...prev, management: true }));
    } else if (path.includes('/dashboard/projects')) {
      setExpandedGroups(prev => ({ ...prev, projects: true }));
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link to="/" className="flex items-center">
              <Logo size="small" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 p-4 space-y-1">
            {/* Main items - Updated order */}
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard') && location.pathname === '/dashboard'
                  ? 'bg-solar-green-50 text-solar-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 text-solar-green-600" />
              <span className="ml-3">Dashboard</span>
            </Link>
            
            <Link
              to="/dashboard/company"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/company')
                  ? 'bg-solar-green-50 text-solar-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-5 h-5 text-solar-green-600" />
              <span className="ml-3">Company</span>
            </Link>

            {/* Projects Group */}
            <div className="space-y-1">
              <button
                onClick={() => toggleGroup('projects')}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                  expandedGroups.projects ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <FolderKanban className="w-5 h-5 text-solar-green-600" />
                  <span className="ml-3 text-gray-700">Projects</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${expandedGroups.projects ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedGroups.projects && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/dashboard/projects"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/projects')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FolderKanban className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Projects</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Management Group */}
            <div className="space-y-1">
              <button
                onClick={() => toggleGroup('management')}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                  expandedGroups.management ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-solar-green-600" />
                  <span className="ml-3 text-gray-700">Team Management</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${expandedGroups.management ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedGroups.management && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/dashboard/team"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/team')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <UserCircle className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Team</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/customers"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/customers')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Store className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Customers</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Finance Group - Changed icon from CircleDollarSign to Banknote */}
            <div className="space-y-1">
              <button
                onClick={() => toggleGroup('finance')}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                  expandedGroups.finance ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Banknote className="w-5 h-5 text-solar-green-600" />
                  <span className="ml-3 text-gray-700">Finance</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${expandedGroups.finance ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedGroups.finance && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/dashboard/wallet"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/wallet')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Wallet</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/credit"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/credit')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Credit</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/inventory"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/inventory')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Package className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Inventory Finance</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/invoices"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/invoices')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Invoices</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/transactions"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/transactions')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeftRight className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Transactions</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/payment-links"
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive('/dashboard/payment-links')
                        ? 'bg-solar-green-50 text-solar-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <LinkIcon className="w-5 h-5 text-solar-green-600" />
                    <span className="ml-3">Payment Links</span>
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/dashboard/notifications"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/notifications')
                  ? 'bg-solar-green-50 text-solar-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BellRing className="w-5 h-5 text-solar-green-600" />
              <span className="ml-3">Notifications</span>
            </Link>
            
            <Link
              to="/dashboard/support"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard/support')
                  ? 'bg-solar-green-50 text-solar-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HelpCircle className="w-5 h-5 text-solar-green-600" />
              <span className="ml-3">Support</span>
            </Link>
          </nav>

          {/* User profile and logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-solar-green-100 flex items-center justify-center">
                <span className="font-semibold text-solar-green-700">
                  {user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2 text-solar-green-600" />
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

export default Dashboard;
