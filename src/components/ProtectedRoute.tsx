import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/session.service';

const ProtectedRoute: React.FC = () => {
  
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 