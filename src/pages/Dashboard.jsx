// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import Header from '../components/Header';
import MainWorkspace from '../components/MainWorkspace';
import AIResponseSection from '../components/AIResponseSection';

function Dashboard({ user, onLogout }) {
  const [theme, setTheme] = useState('light');
  const [extractedText, setExtractedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSendToAI = async (text, settings) => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setAiResponse('');

    await new Promise(r => setTimeout(r, 2500));

    setAiResponse(`
# AI Response Ready

**Hello ${user.name || user.email.split('@')[0]}!**

Your content has been analyzed with the following settings:

- **Style**: ${settings.answerType}
- **Highlight Keywords**: ${settings.highlightKeywords ? 'Yes' : 'No'}
- **Include Examples**: ${settings.includeExamples ? 'Yes' : 'No'}
- **Code Snippets**: ${settings.includeCodeSnippets ? 'Yes' : 'No'}

\`\`\`javascript
console.log("AI Knowledge Extractor is running!");
\`\`\`

This is a **fully functional demo**. Connect to OpenAI, Claude, Gemini, or your own backend to get real AI responses.

You're all set!
    `.trim());

    setIsGenerating(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50'}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Welcome back, {user.name || user.email}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Extract knowledge with AI-powered precision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MainWorkspace
              theme={theme}
              extractedText={extractedText}
              setExtractedText={setExtractedText}
              onSendToAI={handleSendToAI}
            />
          </div>
          <div className="lg:col-span-1">
            <AIResponseSection
              theme={theme}
              response={aiResponse}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;