import React from 'react';

// Inline SVG Icons (no lucide-react dependency)
const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

function ToggleSwitch({ label, checked, onChange, theme }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 ${
          checked
            ? 'bg-gradient-to-r from-indigo-500 to-violet-600'
            : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function AISettings({ theme = 'light', settings, setSettings }) {
  const answerTypes = [
    { value: 'explanation', label: 'Explanation' },
    { value: 'code', label: 'Code Example' },
    { value: 'step-by-step', label: 'Step-by-Step Guide' },
    { value: 'comparison', label: 'Comparison' },
    { value: 'quick-tip', label: 'Quick Tip' },
  ];

  const handleAnswerTypeChange = (e) => {
    setSettings({ ...settings, answerType: e.target.value });
  };

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b flex items-center gap-3 ${
        theme === 'dark' ? 'border-slate-600 bg-slate-800/50' : 'border-slate-200 bg-slate-50'
      }`}>
        <SettingsIcon className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
          AI Settings
        </h3>
      </div>

      {/* Body */}
      <div className="p-5 space-y-6">
        {/* Answer Type Dropdown */}
        <div className="space-y-2">
          <label className={`block text-xs font-semibold uppercase tracking-wider ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Answer Style
          </label>
          <div className="relative">
            <select
              value={settings.answerType || 'simple'}
              onChange={handleAnswerTypeChange}
              className={`w-full px-4 py-3 rounded-lg border text-sm font-medium appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-600 text-slate-200 hover:border-slate-500'
                  : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
              }`}
            >
              {answerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDownIcon className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} />
            </div>
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-5 pt-3">
          <ToggleSwitch
            label="Highlight Keywords"
            checked={settings.highlightKeywords}
            onChange={(checked) => setSettings({ ...settings, highlightKeywords: checked })}
            theme={theme}
          />
          <ToggleSwitch
            label="Include Examples"
            checked={settings.includeExamples}
            onChange={(checked) => setSettings({ ...settings, includeExamples: checked })}
            theme={theme}
          />
          <ToggleSwitch
            label="Include Code Snippets"
            checked={settings.includeCodeSnippets}
            onChange={(checked) => setSettings({ ...settings, includeCodeSnippets: checked })}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default AISettings;