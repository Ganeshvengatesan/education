import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// SVG Icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

function Header({ theme, onToggleTheme, user, onLogout, activeView, onViewChange }) {
  const location = useLocation();
  const isAuthenticated = !!user;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/95 border-slate-700/50'
        : 'bg-white/95 border-slate-200/50'
    }`}>
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between max-w-7xl">
        
        {/* Logo & Brand */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <BookIcon />
          </div>
          <div>
            <span className={`text-xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              AI Knowledge
            </span>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Intelligent Content Analysis
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && location.pathname === '/dashboard' && (
          <div className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 rounded-2xl p-1 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => onViewChange('workspace')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === 'workspace'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => onViewChange('response')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === 'response'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              AI Response
            </button>
          </div>
        )}

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          
          {/* User Info */}
          {isAuthenticated && (
            <div className="flex items-center gap-3 mr-2">
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  <UserIcon />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Premium User</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-all hover:scale-105 border border-transparent hover:border-red-200/50 dark:hover:border-red-500/20"
                title="Logout"
              >
                <LogOutIcon />
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 border ${
              theme === 'dark'
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 border-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;