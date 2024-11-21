import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];
  const isHeaderHidden = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen">
      <Header />
      <main className={`${!isHeaderHidden ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
};