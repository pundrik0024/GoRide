import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const ADMIN_LINKS = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { path: '/admin/buses', label: 'Buses', icon: 'directions_bus' },
  { path: '/admin/routes', label: 'Routes', icon: 'route' },
  { path: '/admin/schedules', label: 'Schedules', icon: 'schedule' },
  { path: '/admin/bookings', label: 'Bookings', icon: 'book_online' },
  { path: '/admin/users', label: 'Users', icon: 'group' },
  { path: '/admin/payments', label: 'Payments', icon: 'payments' },
  { path: '/admin/reports', label: 'Reports', icon: 'analytics' },
  { path: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-[#F7F7F5] overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#171717] bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E6E6E1] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b border-[#E6E6E1]">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#171717] tracking-tight">GoRide Admin</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></div>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#E8EEE9] text-[#315C4B]' 
                    : 'text-[#6B6B67] hover:bg-[#F7F7F5] hover:text-[#171717]'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E6E6E1] flex items-center justify-between px-6 z-10">
          <button 
            className="md:hidden text-[#171717] p-2 -ml-2 rounded-lg hover:bg-[#F7F7F5]"
            onClick={toggleSidebar}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#171717] font-medium border border-[#E6E6E1] rounded-lg px-3 py-1.5">
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
              {user?.name}
            </div>
            <button onClick={logout} className="text-sm text-red-600 font-medium hover:underline">
              Logout
            </button>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
