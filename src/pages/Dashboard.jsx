import React, { useState } from 'react';
import Header from '../components/Header';
import MainWorkspace from '../components/MainWorkspace';
import AIResponseSection from '../components/AIResponseSection';
import apiService from '../utils/api';

function Dashboard({ user, onLogout }) {
  const [theme, setTheme] = useState('light');
  const [extractedText, setExtractedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState('workspace');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSendToAI = async (question, text, settings) => {
    if (!text.trim()) {
      alert('Please provide some content to analyze');
      return;
    }

    setIsGenerating(true);
    setAiResponse('');

    try {
      const response = await apiService.generateAnswer(question, text, settings.answerType);
      if (response.data && response.data.answer) {
        setAiResponse(response.data.answer);
        setActiveView('response');
      } else {
        throw new Error('No answer received from AI');
      }
    } catch (error) {
      console.error('AI generation error:', error);
      const errorMessage = error.message || 'Failed to generate AI response. Please try again.';
      setAiResponse(`**Error:** ${errorMessage}\n\nPlease check your connection and try again.`);
      setActiveView('response');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'
    }`}>
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        user={user} 
        onLogout={onLogout}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Mobile View Toggle */}
        <div className="lg:hidden mb-6">
          <div className="flex bg-white/80 dark:bg-slate-800/80 rounded-2xl p-1 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setActiveView('workspace')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeView === 'workspace'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => setActiveView('response')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeView === 'response'
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              AI Response
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Workspace Column */}
          <div className={`lg:col-span-2 transition-all duration-300 ${
            activeView === 'response' ? 'lg:block hidden' : 'block'
          }`}>
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Welcome back, {user.name || user.email}!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                Transform your content with AI-powered insights
              </p>
            </div>
            
            <MainWorkspace
              theme={theme}
              extractedText={extractedText}
              setExtractedText={setExtractedText}
              onSendToAI={handleSendToAI}
            />
          </div>

          {/* AI Response Column */}
          <div className={`transition-all duration-300 ${
            activeView === 'workspace' ? 'lg:block hidden' : 'block'
          }`}>
            <AIResponseSection
              theme={theme}
              response={aiResponse}
              isGenerating={isGenerating}
              onRegenerate={() => activeView === 'response' && aiResponse && handleSendToAI(
                "Please regenerate the response",
                extractedText,
                { answerType: 'explanation' }
              )}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;