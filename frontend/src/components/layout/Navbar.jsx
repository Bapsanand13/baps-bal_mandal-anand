import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  Bell, 
  Info, 
  Download, 
  User, 
  LogIn, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Posts', path: '/posts', icon: FileText },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Install App', path: '/install', icon: Download },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <nav className="bg-white shadow-lg border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-800">BAPS Bal Mandal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white shadow-lg border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold text-gray-800">BAPS Bal Mandal</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                        isActive(link.path)
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                    {user?.role === 'admin' && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Admin</span>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">Menu</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Info */}
              {isAuthenticated && (
                <div className="px-4 py-3 bg-orange-50 border-b border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user?.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                      {user?.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Admin</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive(link.path)
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* User Actions */}
              <div className="p-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 