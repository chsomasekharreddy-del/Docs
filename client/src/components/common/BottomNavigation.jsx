import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageSquarePlus, Bookmark, User, Settings } from 'lucide-react';

export default function BottomNavigation() {
  const location = useLocation();

  // Hide bottom nav on auth pages (signin / signup)
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Chats', path: '/chat', icon: MessageSquarePlus },
    { name: 'Insights', path: '/insights', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#090e1c]/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800/80 px-2 py-2 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className={`relative p-1 rounded-lg transition-transform ${isActive ? 'scale-110' : ''}`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
