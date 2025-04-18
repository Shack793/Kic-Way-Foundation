import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { About } from './screens/About/About';
import { AdminPanel } from './screens/Admin/AdminPanel';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Login } from './components/auth/Login';
import ErrorBoundary from './components/ErrorBoundary';
import LoginTest from './components/tests/LoginTest';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactElement; adminOnly?: boolean }> = ({ 
  element, 
  adminOnly = false 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return element;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute 
              element={<AdminPanel />} 
              adminOnly={true} 
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              element={<Dashboard />} 
              adminOnly={false} 
            />
          } 
        />
        <Route path="/test-login" element={<LoginTest />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;





