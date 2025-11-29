import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

function AIResponseSection({ theme = 'light', response = '', isGenerating = false }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  const handleDownload = () => {
    const blob = new Blob([response], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-response.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SVG Icons (pure, no dependencies)
  const CopyIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const SparklesIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.5 17.5 9.967a1 1 0 010 1.614L14.146 14.5 12.967 19.256a1 1 0 01-1.934 0L9.854 14.5 6.5 12.033a1 1 0 010-1.614L9.854 7.5 11.033 2.744A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
  );

  const RefreshIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  const FileTextIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 overflow-hidden sticky top-24 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <SparklesIcon />
          </div>
          <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            AI Response
          </h3>
        </div>

        {response && !isGenerating && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`p-2.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Copy response"
            >
              <CopyIcon />
            </button>
            <button
              onClick={handleDownload}
              className={`p-2.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Download as markdown"
            >
              <DownloadIcon />
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 min-h-[300px]">
        {isGenerating ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center animate-pulse">
                <SparklesIcon />
              </div>
              <div className="flex-1 space-y-3">
                <div className={`h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} style={{ width: '85%' }} />
                <div className={`h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} style={{ width: '65%' }} />
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {[70, 90, 60, 80].map((width, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}
                  style={{ width: `${width}%`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 pt-6">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-200" />
              <span className={`text-sm ml-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                AI is thinking...
              </span>
            </div>
          </div>
        ) : response ? (
          <div className="space-y-6">
            <div className={`rounded-xl p-5 max-h-96 overflow-y-auto border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <MarkdownRenderer content={response} theme={theme} />
            </div>

            <div className="flex gap-3">
              <button className={`flex-1 py-3 px-5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>
                <RefreshIcon />
                Regenerate
              </button>
              <button className={`flex-1 py-3 px-5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>
                <FileTextIcon />
                Improve
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-16 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <SparklesIcon />
            </div>
            <p className="text-lg font-medium">No response yet</p>
            <p className="text-sm mt-1">Send a message to get started with AI</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIResponseSection;