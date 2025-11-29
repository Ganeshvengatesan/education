// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  BookOpen,
  LogIn,
  UserPlus
} from 'lucide-react';

function Header({ theme, onToggleTheme, user, onLogout }) {
  const location = useLocation();
  const isAuthenticated = !!user;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/95 border-slate-800'
        : 'bg-white/95 border-slate-200'
    }`}>
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
        
        {/* Logo & Brand */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            AI Knowledge
          </span>
        </Link>

        {/* Center Navigation (Only on Dashboard) */}
        {isAuthenticated && location.pathname === '/dashboard' && (
          <div className="hidden lg:flex items-center gap-10">
            <Link to="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Dashboard
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Features
            </a>
            <a href="#docs" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Docs
            </a>
          </div>
        )}

        {/* Right Side: Auth + Theme Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Show Login/Register when NOT logged in */}
          {!isAuthenticated && (
            <>
              {location.pathname !== '/login' && (
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-violet-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              )}
            </>
          )}

          {/* Show User Info + Logout when logged in */}
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {(user.name || user.email)?.[0].toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active User</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2.5 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg ${
              theme === 'dark'
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;