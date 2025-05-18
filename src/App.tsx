import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Layout } from './components/Layout/Layout';
import { Signup } from './components/SignUp/SignUp';
import { Signin } from './components/SignIn/SignIn';
import { ProductsPage } from './components/Product/ProductsPage';
import { ProfilePage } from './components/Header/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* public */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route element={<ProtectedRoute reverse />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* protected */}
          <Route path="/products" element={<ProtectedRoute />}>
            <Route index element={<ProductsPage />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route index element={<ProfilePage />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
