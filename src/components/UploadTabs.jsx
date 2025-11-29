import React, { useState } from 'react';
import PDFUpload from './PDFUpload';
import ScreenshotUpload from './ScreenshotUpload';
import ManualTextInput from './ManualTextInput';

// Pure SVG Icons (no lucide-react!)
const FileTextIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TypeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

function UploadTabs({ theme = 'light', extractedText = '', setExtractedText }) {
  const [activeTab, setActiveTab] = useState('text');

  const tabs = [
    { id: 'pdf', label: 'Upload PDF', Icon: FileTextIcon },
    { id: 'screenshot', label: 'Screenshot', Icon: ImageIcon },
    { id: 'text', label: 'Manual Input', Icon: TypeIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Buttons */}
      <div className={`flex flex-wrap gap-3 p-2 rounded-2xl shadow-inner ${
        theme === 'dark' ? 'bg-slate-800/70' : 'bg-slate-100'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] px-5 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl transform hover:scale-105
                ${activeTab === tab.id
                  ? theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-2xl'
                    : 'bg-white text-indigo-700 shadow-xl'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
            >
              <Icon />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        {activeTab === 'pdf' && (
          <PDFUpload theme={theme} setExtractedText={setExtractedText} />
        )}
        {activeTab === 'screenshot' && (
          <ScreenshotUpload theme={theme} setExtractedText={setExtractedText} />
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