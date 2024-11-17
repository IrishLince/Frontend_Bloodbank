import React, { useState, useEffect } from 'react';
import { Menu, X, UserCircle2, Settings, LogOut, User, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userData = {
    username: localStorage.getItem('username') || 'User',
    email: localStorage.getItem('email') || 'user@example.com',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.profile-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative profile-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <UserCircle2 className="w-8 h-8 text-gray-600 hover:text-red-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <UserCircle2 className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                  <User className="w-4 h-4" />
                  <span className="truncate">{userData.username}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{userData.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={() => navigate('/profile-settings')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      if (!token && location.pathname !== '/about-us') {
        setIsAuthenticated(false);
        navigate('/homepage');
      } else {
        setIsAuthenticated(!!token);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    navigate('/homepage');
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    const commonClasses = "px-4 py-2 rounded-lg transition-all duration-300";

    const specificClasses = isAuthenticated
  ? isActive
    ? "bg-white text-red-600 font-semibold" // Active state for authenticated
    : "text-black hover:bg-white hover:text-red-600"
  : isActive
  ? "bg-white text-red-600 font-semibold" // Active state for non-authenticated
  : "text-black hover:bg-white hover:text-red-600"; //

    return (
      <Link to={to} className={`${commonClasses} ${specificClasses}`}>
        {children}
      </Link>
    );
  };

  const LoggedInLinks = () => (
    <>
      <NavLink to="/successful-login">Home</NavLink>
      <NavLink to="/hospital">Hospital</NavLink>
      <NavLink to="/donation-center">Online Booking</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
    </>
  );

  const LoggedOutLinks = () => (
    <>
      <NavLink to="/homepage">Home</NavLink>
      <NavLink to="/contact">Contact Us</NavLink>
      <NavLink to="/faqs">FAQs</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <div className="flex gap-2">
        <Link
          to="/signup"
          className="px-4 py-2 rounded-lg bg-white text-red-600 hover:bg-red-50 transition-colors duration-300"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
        >
          Log In
        </Link>
      </div>
    </>
  );

  return (
    <header className={`${isAuthenticated ? 'bg-white' : 'bg-red-600'} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl bg-red-600 mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/successful-login' : '/homepage'}>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold">BB</span>
              </div>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />}
          </nav>

          {isAuthenticated && (
            <div className="hidden md:block">
              <ProfileDropdown onLogout={handleLogout} />
            </div>
          )}
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden ${isAuthenticated ? 'bg-white' : 'bg-red-600'}`}>
            <nav className="flex flex-col gap-2 p-4">
              {isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
