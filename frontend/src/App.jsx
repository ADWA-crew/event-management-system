import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from '../Login/page.jsx';
import RegisterEvent from '../Login/RegisterEvent.jsx';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Login route wrapper — redirect to dashboard if already authenticated
function LoginRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage onNavigate={(path) => navigate(path)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<LoginRoute />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Event Registration Route */}
          <Route
            path="/register-event"
            element={
              <ProtectedRoute>
                <RegisterEvent />
              </ProtectedRoute>
            }
          />

          {/* Default */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
