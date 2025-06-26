import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/attendance', label: 'Attendance' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/posts', label: 'Posts' },
  { to: '/admin/achievements', label: 'Achievements' },
  { to: '/admin/notifications', label: 'Notifications' },
  { to: '/admin/logs', label: 'Logs' },
];

export default function Sidebar() {
  return (
    <aside className="bg-white border-r w-64 min-h-screen flex flex-col">
      <div className="p-4 font-bold text-xl text-center border-b">Admin Panel</div>
      <nav className="flex-1 p-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-100 mb-1 ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 