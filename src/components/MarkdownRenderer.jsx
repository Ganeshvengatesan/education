import React from 'react';

function MarkdownRenderer({ content = '', theme = 'light' }) {
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className={`my-4 ml-8 space-y-2 list-disc marker:text-indigo-500 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const processInline = (text) => {
    const parts = text
      .replace(/\*\*(.*?)\*\*/g, '||$1||')
      .replace(/\*(.*?)\*/g, '|$1|')
      .replace(/`(.*?)`/g, '~$1~')
      .split(/(\|\||\|~|~|\|)/)
      .filter(Boolean);

    return parts.map((part, i) => {
      if (part === '||') return <strong key={i} className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`} />;
      if (part === '|') return <em key={i} className="italic text-indigo-400" />;
      if (part === '~') return <code key={i} className={`px-1.5 py-0.5 rounded text-sm font-mono ${theme === 'dark' ? 'bg-slate-800 text-indigo-300' : 'bg-slate-200 text-indigo-700'}`} />;
      if (part.match(/^\|\||\|~|~$/)) return null;
      
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${index}`}
            className={`my-6 p-5 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed border ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : 'bg-slate-800/90 border-slate-300 text-slate-100'
            }`}
          >
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
      }
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line.slice(line.search(/\S|$/) || 0)); // preserve indentation
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={index} className={`text-3xl font-bold my-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {processInline(line.slice(2))}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className={`text-2xl font-bold my-5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {processInline(line.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className={`text-xl font-semibold my-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {processInline(line.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      listItems.push(processInline(line.replace(/^- |\u2022 /, '')));
    } else if (trimmed === '') {
      flushList();
      elements.push(<div key={index} className="h-3" />);
    } else {
      flushList();
      elements.push(
        <p
          key={index}
          className={`my-4 leading-relaxed text-base ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {processInline(line)}
        </p>
      );
    }
  });

  flushList();

  return <div className="prose prose-lg max-w-none">{elements}</div>;
}

export default MarkdownRenderer;