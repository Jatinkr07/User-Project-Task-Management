import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Settings } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Projects', href: '/', icon: ClipboardList },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-primary-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">TaskTrack</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive 
                        ? 'bg-primary-900 text-white' 
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'}
                    `}
                  >
                    <item.icon 
                      className={`
                        mr-3 h-5 w-5
                        ${isActive ? 'text-primary-300' : 'text-primary-400 group-hover:text-primary-300'}
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <div className="flex-shrink-0 w-full">
              <p className="text-sm font-medium text-primary-100">TaskTrack v1.0</p>
              <p className="text-xs text-primary-300 mt-1">
                Manage tasks efficiently
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;