import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Footer from './global/Footer';
import Navbar from './global/Navbar';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
