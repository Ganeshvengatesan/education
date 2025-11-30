import React, { useState } from 'react';
import PDFUpload from './PDFUpload';
import ScreenshotUpload from './ScreenshotUpload';
import ManualTextInput from './ManualTextInput';

// Enhanced SVG Icons
const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TypeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

function UploadTabs({ theme = 'light', extractedText = '', setExtractedText, onSendToAI, onSend = () => {} }) {
  const [activeTab, setActiveTab] = useState('text');

  const tabs = [
    { 
      id: 'text', 
      label: 'Text Input', 
      Icon: TypeIcon,
      description: 'Paste or type your content directly'
    },
    { 
      id: 'pdf', 
      label: 'PDF Upload', 
      Icon: FileTextIcon,
      description: 'Upload and extract text from PDF files'
    },
    { 
      id: 'screenshot', 
      label: 'Screenshot', 
      Icon: ImageIcon,
      description: 'Upload images for text extraction'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Tab Navigation */}
      <div className={`rounded-2xl p-2 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100/50'} border ${
        theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 group border-2 ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-indigo-500/20 to-violet-600/20 border-indigo-500/30 shadow-lg'
                      : 'bg-white border-indigo-200 shadow-lg'
                    : theme === 'dark'
                      ? 'border-transparent hover:border-slate-600 hover:bg-slate-700/30'
                      : 'border-transparent hover:border-slate-300 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                      : theme === 'dark'
                        ? 'bg-slate-700 text-slate-400 group-hover:text-slate-300'
                        : 'bg-slate-200 text-slate-600 group-hover:text-slate-900'
                  }`}>
                    <Icon />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${
                      isActive
                        ? theme === 'dark' ? 'text-white' : 'text-slate-900'
                        : theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {tab.label}
                    </h3>
                    <p className={`text-xs mt-0.5 ${
                      isActive
                        ? theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        : theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                    }`}>
                      {tab.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        {activeTab === 'pdf' && (
          <PDFUpload theme={theme} setExtractedText={setExtractedText} />
        )}
        {activeTab === 'screenshot' && (
          <ScreenshotUpload theme={theme} setExtractedText={setExtractedText} onSendToAI={onSendToAI} extractedText={extractedText} onSend={onSend} />
        )}
        {activeTab === 'text' && (
          <ManualTextInput
            theme={theme}
            value={extractedText}
            onChange={setExtractedText}
          />
        )}
      </div>
    </div>
  );
}

export default UploadTabs;