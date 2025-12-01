import React, { useState } from 'react';
import UploadTabs from './UploadTabs';
import ExtractedTextPreview from './ExtractedTextPreview';
import AISettings from './AISettings';

function MainWorkspace({
  theme = 'light',
  extractedText = '',
  setExtractedText,
  onSendToAI
}) {
  const [settings, setSettings] = useState({
    answerType: 'explanation',
    highlightKeywords: true,
    includeExamples: true,
    includeCodeSnippets: false,
  });

  const handleSend = (question) => {
    if (extractedText.trim()) {
      onSendToAI(question, extractedText, settings);
    }
  };

  return (
    <div className={`rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden border ${
      theme === 'dark' 
        ? 'bg-slate-800/90 border-slate-700/50' 
        : 'bg-white border-slate-200/50'
    } backdrop-blur-sm`}>
      <div className="p-6 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent`}>
                Content Analyzer
              </h2>
              <p className={`text-base leading-relaxed mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Upload documents, paste text, or capture screenshots for AI-powered analysis
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Input/Upload */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <UploadTabs
              theme={theme}
              extractedText={extractedText}
              setExtractedText={setExtractedText}
              onSendToAI={onSendToAI}
              onSend={handleSend}
            />
          </div>

          {/* Right Column: Preview & Settings */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {extractedText.trim() ? (
              <>
                <ExtractedTextPreview
                  theme={theme}
                  text={extractedText}
                  onClear={() => setExtractedText('')}
                  onSend={handleSend}
                />
                <AISettings
                  theme={theme}
                  settings={settings}
                  setSettings={setSettings}
                />
              </>
            ) : (
              <div className={`h-full rounded-2xl border-2 border-dashed flex items-center justify-center p-8 ${
                theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-300/50 bg-slate-50/50'
              }`}>
                <div className="text-center space-y-3">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Content preview and settings will appear here after you upload or enter text
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default MainWorkspace;