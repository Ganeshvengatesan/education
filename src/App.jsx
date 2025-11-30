// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,   // ← THIS IS THE FIX
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('ai-knowledge-user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('ai-knowledge-user');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
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

  const handleLogout = () => {
    setUser(null);
  };

  // Helper function to check if user is authenticated
  const isAuthenticated = () => {
    const savedUser = localStorage.getItem('ai-knowledge-user');
    return savedUser && savedUser !== 'undefined' && savedUser !== null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleLogin} />}
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;