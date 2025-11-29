// src/pages/Login.jsx
import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';   // ← ADD useNavigate

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();   // ← This enables navigation

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Static Demo Credentials
    if (email === 'ganesh@gmail.com' && password === 'admin@123') {
      // Success → Save user + Navigate to Dashboard
      const userData = { email: 'ganesh@gmail.com', name: 'Ganesh Kumar' };
      
      // Call parent function (saves to localStorage)
      if (onLogin) onLogin(userData);

      // Instantly go to Dashboard
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials. Use: ganesh@gmail.com / admin@123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-200">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-600 mt-2">Sign in to continue</p>
          </div>

          {/* Demo Credentials Box */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 rounded-xl text-center">
            <p className="text-sm font-bold text-indigo-800">Demo Login</p>
            <p className="text-xs text-indigo-700 mt-1">
              Email: <strong>ganesh@gmail.com</strong><br />
              Password: <strong>admin@123</strong>
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="ganesh@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="admin@123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;