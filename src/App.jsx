// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import apiService from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ai-knowledge-user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('ai-knowledge-user');
      }
    } else {
      localStorage.removeItem('ai-knowledge-user');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const res = await apiService.me();
          if (res?.data?.user) {
            setUser(res.data.user);
          }
        } catch (error) {
          // Not authenticated or /auth/me unavailable; ignore
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ai-knowledge-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ai-knowledge-user');
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (e) {
      // ignore logout errors
    }
    setUser(null);
    localStorage.removeItem('ai-knowledge-user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 font-medium">Loading AI Knowledge...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppContent 
        user={user}
        loading={loading}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
    </Router>
  );
}

function AppContent({ user, loading, onLogin, onLogout, isAuthenticated }) {
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 font-medium">Loading AI Knowledge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={onLogin} />
          } 
        />
        <Route
          path="/register"
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Register onRegister={onLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? 
            <Dashboard user={user} onLogout={onLogout} /> : 
            <Navigate to="/login" replace />
          }
        />
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;