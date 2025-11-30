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

  const handleSend = () => {
    if (extractedText.trim()) {
      onSendToAI(extractedText, settings);
    }
  };

  return (
    <div className={`rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden border ${
      theme === 'dark' 
        ? 'bg-slate-800/90 border-slate-700' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="p-6 md:p-10 lg:p-12 space-y-10">
        
        {/* Title & Description */}
        <div className="space-y-3">
          <h2 className={`text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent`}>
            Input Your Content
          </h2>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Upload documents, paste text, or capture content — then let AI transform it into clear, structured knowledge.
          </p>
        </div>

        {/* Upload Tabs */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <UploadTabs
            theme={theme}
            extractedText={extractedText}
            setExtractedText={setExtractedText}
          />
        </div>

        {/* Preview + Send (only if text exists) */}
        {extractedText.trim() ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ExtractedTextPreview
              theme={theme}
              text={extractedText}
              onClear={() => setExtractedText('')}
              onSend={handleSend}
            />
          </div>
        ) : null}

        {/* AI Settings */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <AISettings
            theme={theme}
            settings={settings}
            setSettings={setSettings}
          />
        </div>

      </div>
    </div>
  );
}

export default MainWorkspace;