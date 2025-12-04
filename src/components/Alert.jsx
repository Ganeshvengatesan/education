import React from 'react';

function Alert({ type = 'info', title, message, details, onClose }) {
  const variants = {
    success: {
      container: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    error: {
      container: 'bg-red-50 text-red-700 border-red-200',
      badge: 'bg-red-100 text-red-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14" />
        </svg>
      )
    },
    warning: {
      container: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86l-7.1 12.28A2 2 0 005.1 19h13.8a2 2 0 001.72-2.86l-7.1-12.28a2 2 0 00-3.42 0z" />
        </svg>
      )
    },
    info: {
      container: 'bg-sky-50 text-sky-800 border-sky-200',
      badge: 'bg-sky-100 text-sky-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      )
    },
  };

  const v = variants[type] || variants.info;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${v.container}`}>
      <div className="mt-0.5">{v.icon}</div>
      <div className="flex-1">
        {title && (
          <div className={`inline-flex items-center gap-2 text-sm font-semibold px-2 py-1 rounded-md ${v.badge}`}>
            {title}
          </div>
        )}
        {message && (
          <p className="mt-2 text-sm leading-relaxed">{message}</p>
        )}
        {details && (
          <pre className="mt-2 text-xs bg-black/5 rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">{details}</pre>
        )}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;