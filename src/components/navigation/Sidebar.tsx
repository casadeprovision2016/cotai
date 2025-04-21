
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Kanban, MessageSquare, FileText, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  isCollapsed 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean; 
  isCollapsed: boolean; 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 my-1 rounded-md transition-colors",
        isActive 
          ? "bg-cotai-purple text-white" 
          : "text-gray-700 hover:bg-cotai-purple/10"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Kanban, label: 'Dashboard' },
    { to: '/kanban', icon: Kanban, label: 'Kanban' },
    { to: '/parser', icon: FileText, label: 'Documentos' },
    { to: '/messages', icon: MessageSquare, label: 'Mensagens' },
    { to: '/calendar', icon: Calendar, label: 'Calendário' },
  ];

  const bottomNavItems = [
    { to: '/settings', icon: Settings, label: 'Configurações' },
    { to: '/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-cotai-purple">CotAI</h1>
        )}
        {isCollapsed && (
          <div className="mx-auto">
            <span className="text-xl font-bold text-cotai-purple">C</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((item) => (
          <NavItem 
            key={item.to} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            isActive={location.pathname === item.to} 
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 py-4 px-2">
        {bottomNavItems.map((item) => (
          <NavItem 
            key={item.to} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            isActive={location.pathname === item.to} 
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
