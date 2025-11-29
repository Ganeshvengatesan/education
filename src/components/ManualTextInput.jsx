import React from 'react';

// Inline Type (Text) Icon – no lucide-react needed
const TypeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

function ManualTextInput({ theme = 'light', value = '', onChange }) {
  // Calculate word count
  const wordCount = value.trim() === '' 
    ? 0 
    : value.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-5">
      {/* Label with Icon */}
      <div className="flex items-center gap-3">
        <TypeIcon className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
        <label className={`text-sm font-semibold tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          Enter your content
        </label>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your content here..."
        className={`w-full min-h-64 px-5 py-4 rounded-2xl border-2 text-sm font-mono leading-relaxed transition-all duration-300 resize-y focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder:font-sans
          ${theme === 'dark'
            ? 'bg-slate-800/70 border-slate-600 text-slate-200 placeholder-slate-500 backdrop-blur-sm'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-inner'
          }`}
        style={{ maxHeight: '500px' }}
        rows={10}
      />

      {/* Character & Word Counter */}
      <div className={`text-xs font-medium tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        <span className="text-indigo-500">{value.length}</span> characters 
        {' · '}
        <span className="text-violet-500">{wordCount}</span> word{wordCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default ManualTextInput;