import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Footer from './global/Footer';
import Navbar from './global/Navbar';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-background">{children}</div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
