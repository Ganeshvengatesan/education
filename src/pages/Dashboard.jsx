import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MainWorkspace from '../components/MainWorkspace';
import AIResponseSection from '../components/AIResponseSection';
import Alert from '../components/Alert';
import apiService from '../utils/api';

function Dashboard({ user, onLogout }) {
  const [theme, setTheme] = useState('dark');
  const [extractedText, setExtractedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState('workspace');
  const [flash, setFlash] = useState('');

  useEffect(() => {
    const msg = sessionStorage.getItem('flash-success');
    if (msg) {
      setFlash(msg);
      sessionStorage.removeItem('flash-success');
      const t = setTimeout(() => setFlash(''), 4000);
      return () => clearTimeout(t);
    }
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSendToAI = async (question, text, settings) => {
    if (!text.trim()) {
      setFlash('Please provide some content to analyze');
      return;
    }

    setIsGenerating(true);
    setAiResponse('');

    try {
      const response = await apiService.generateAnswer(question, text, settings.answerType);
      if (response.data && response.data.answer) {
        setAiResponse(response.data.answer);
      } else {
        throw new Error('No answer received from AI');
      }
    } catch (error) {
      console.error('AI generation error:', error);
      const errorMessage = error.message || 'Failed to generate AI response. Please try again.';
      setAiResponse(`**Error:** ${errorMessage}\n\nPlease check your connection and try again.`);
    } finally {
      setIsGenerating(false);
      setActiveView('response');
    }
  };

  const handleContinueChat = async (followUp) => {
    setIsGenerating(true);
    try {
      const context = `${extractedText}\n\nPrevious answer:\n${aiResponse}`.trim();
      const response = await apiService.generateAnswer(followUp, context, 'explanation');
      if (response.data && response.data.answer) {
        setAiResponse(response.data.answer);
      } else {
        throw new Error('No answer received from AI');
      }
    } catch (error) {
      console.error('Continue chat error:', error);
      const errorMessage = error.message || 'Failed to generate AI response.';
      setAiResponse(`**Error:** ${errorMessage}`);
    } finally {
      setIsGenerating(false);
      setActiveView('response');
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

      <main className="container mx-auto px-4 py-6 max-w-7xl space-y-8">
        {flash && (
          <div className="mb-2">
            <Alert type="success" title="Success" message={flash} onClose={() => setFlash('')} />
          </div>
        )}

        {/* Workspace Section - Top */}
        <section aria-labelledby="workspace-title">
          <div className="mb-6">
            <h1 id="workspace-title" className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
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
        </section>

        {/* AI Response Section - Bottom */}
        <section aria-labelledby="ai-response-title">
          <h2 id="ai-response-title" className="sr-only">AI Response</h2>
          <AIResponseSection
            theme={theme}
            response={aiResponse}
            isGenerating={isGenerating}
            onRegenerate={() => aiResponse && handleSendToAI(
              'Please regenerate the response',
              extractedText,
              { answerType: 'explanation' }
            )}
            onContinueChat={handleContinueChat}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;