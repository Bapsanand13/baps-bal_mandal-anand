import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="font-bold text-lg">BAPS Bal Mandal Admin</div>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-700">{user.name} ({user.role})</span>
        )}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
} 