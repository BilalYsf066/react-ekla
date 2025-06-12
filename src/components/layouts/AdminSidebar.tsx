import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Tags, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-neutral-200">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold text-primary-600">
          Ekla Admin
        </h1>
      </div>

      <nav className="px-4 py-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg mb-1 ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`
          }
        >
          <LayoutDashboard size={18} className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg mb-1 ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`
          }
        >
          <Users size={18} className="mr-3" />
          Users
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg mb-1 ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`
          }
        >
          <Tags size={18} className="mr-3" />
          Categories
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg mb-1 ${
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`
          }
        >
          <Settings size={18} className="mr-3" />
          Settings
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-lg mb-1 text-red-600 hover:bg-red-50 w-full text-left"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;