import React, { type ReactNode } from 'react';
import { AuthProvider } from '../auth/AuthContext';

interface LoginWrapperProps {
  children: ReactNode;
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default LoginWrapper;
