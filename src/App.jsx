// src/App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  if (!isLoggedIn) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// App Routes component that uses authentication context
const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;