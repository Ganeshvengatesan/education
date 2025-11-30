import React from 'react';

const TypeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

function ManualTextInput({ theme = 'light', value = '', onChange }) {
  const wordCount = value.trim() === '' 
    ? 0 
    : value.trim().split(/\s+/).filter(word => word.length > 0).length;
  
  const charCount = value.length;
  const lineCount = value.split('\n').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'
          }`}>
            <TypeIcon />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Text Input
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Paste or type your content below
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className={`text-xs font-medium px-3 py-1.5 rounded-full ${
          theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-200/50 text-slate-600'
        }`}>
          {wordCount} words
        </div>
      </div>

      {/* Textarea */}
      <div className={`rounded-2xl border-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-slate-600/50'
          : 'bg-white border-slate-300/50'
      }`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste your content here...\n\nYou can paste articles, code snippets, notes, or any text you want to analyze with AI."
          className={`w-full min-h-64 px-5 py-4 rounded-2xl text-sm font-mono leading-relaxed resize-y focus:outline-none transition-colors ${
            theme === 'dark'
              ? 'bg-transparent text-slate-200 placeholder-slate-500'
              : 'bg-transparent text-slate-900 placeholder-slate-400'
          }`}
          style={{ maxHeight: '500px' }}
          rows={12}
        />
        
        {/* Footer with detailed stats */}
        <div className={`px-5 py-3 border-t ${
          theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span>{charCount} characters</span>
              <span>{wordCount} words</span>
              <span>{lineCount} lines</span>
            </div>
            <div className={`px-2 py-1 rounded ${
              theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-100'
            }`}>
              <span className="font-mono text-xs">
                {Math.ceil(charCount / 5)} tokens
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className={`rounded-xl p-4 ${
        theme === 'dark' ? 'bg-slate-800/30 border-slate-700/50' : 'bg-blue-50/50 border-blue-200/50'
      } border`}>
        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm">
            <p className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Pro Tip
            </p>
            <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              For best results, provide clear context and specific questions. The AI works better with well-structured content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualTextInput;