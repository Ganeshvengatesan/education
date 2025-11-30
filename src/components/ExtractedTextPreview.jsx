import React, { useState } from 'react';

// Inline SVG Icons (no dependencies)
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M14 12v5m-4-5v5" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

function ExtractedTextPreview({ theme = 'light', text = '', onClear, onSend }) {
  const [question, setQuestion] = useState('');
  // Count words (ignores extra whitespace)
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${
      theme === 'dark' 
        ? 'border-slate-700 bg-slate-800/50' 
        : 'border-slate-200 bg-slate-50'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${
        theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
      }`}>
        <div>
          <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
            Content Preview
          </h3>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={onClear}
          className={`p-2.5 rounded-lg transition-all hover:scale-110 ${
            theme === 'dark'
              ? 'hover:bg-slate-700 text-slate-400'
              : 'hover:bg-slate-200 text-slate-600'
          }`}
          title="Clear text"
          aria-label="Clear extracted text"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Text Preview */}
      <div className={`p-5 max-h-52 overflow-y-auto font-mono text-xs leading-relaxed tracking-wide ${
        theme === 'dark' ? 'text-slate-300 bg-slate-900/30' : 'text-slate-700 bg-white/50'
      } border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        {text || (
          <span className="italic text-slate-500">No text extracted yet...</span>
        )}
      </div>

      {/* Question Input */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
          Ask a question about this content:
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Explain this concept, What does this mean?, Summarize this..."
          className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
          }`}
        />
      </div>

      {/* Send Button */}
      <div className="p-5">
        <button
          onClick={() => onSend(question || "Please analyze and explain this content")}
          disabled={!text.trim()}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5
            bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600
            hover:from-indigo-600 hover:via-purple-600 hover:to-violet-700
            active:scale-98
            disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
            focus:outline-none focus:ring-4 focus:ring-purple-500/30
          `}
        >
          <SendIcon />
          Ask AI
        </button>
      </div>
    </div>
  );
}

export default ExtractedTextPreview;