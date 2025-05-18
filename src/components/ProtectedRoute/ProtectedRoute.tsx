import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface ProtectedRouteProps {
  reverse?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ reverse = false }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 1) Normal protected route: require a user
  if (!reverse && !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 2) Reverse route (guest-only): redirect authenticated users
  if (reverse && user) {
    return <Navigate to="/products" replace />;
  }

  // 3) Otherwise, render child routes
  return <Outlet />;
};
