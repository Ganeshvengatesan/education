import React, { useState, useRef } from 'react';
import apiService from '../utils/api';
import Alert from './Alert';

// Inline SVG Icons (no lucide-react!)
const ImageIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function ScreenshotUpload({ theme = 'light', setExtractedText, onSendToAI, extractedText, onSend }) {
  const [image, setImage] = useState(null); // base64 string
  const [question, setQuestion] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [notice, setNotice] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const processImage = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result;
      setImage(base64);
      setIsExtracting(true);
      setNotice(null);

      try {
        const response = await apiService.uploadFile(file);
        if (response.data && response.data.extractedText) {
          setExtractedText(response.data.extractedText);
          setNotice({
            type: 'success',
            title: 'Image processed',
            message: 'Text extracted successfully from screenshot.',
          });
        } else {
          throw new Error('No text extracted from image');
        }
      } catch (error) {
        console.error('Image processing error:', error);
        const serverMsg = error.response?.data?.message;
        const serverDetails = error.response?.data?.details;
        setNotice({
          type: 'error',
          title: 'Processing failed',
          message: serverMsg || error.message || 'Failed to extract text from image. Please try again.',
          details: typeof serverDetails === 'string' ? serverDetails : undefined,
        });
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } finally {
        setIsExtracting(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setExtractedText('');
    setQuestion('');
    setNotice(null);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        /* Upload Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-105 shadow-2xl'
              : theme === 'dark'
                ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/40'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isDragging ? 'bg-indigo-500/20' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <ImageIcon className={isDragging ? 'text-indigo-400' : theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
            </div>

            <div>
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
                {isDragging ? 'Drop your screenshot!' : 'Drop screenshot or click to upload'}
              </p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                PNG, JPG, JPEG, WEBP • Max 10MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="screenshot-input"
              disabled={isExtracting}
            />
            <label
              htmlFor="screenshot-input"
              className={`inline-block px-8 py-4 font-bold text-lg rounded-xl shadow-xl transform transition-all duration-200 
                ${isExtracting
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-2xl hover:from-indigo-600 hover:to-violet-700 hover:scale-105'
                }`
              }
            >
              {isExtracting ? 'Processing…' : 'Choose Image'}
            </label>
          </div>
        </div>
      ) : (
        /* Image Preview */
        <div className="space-y-5">
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <img
              src={image}
              alt="Uploaded screenshot"
              className="w-full h-auto max-h-96 object-contain bg-black/20"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition-all hover:scale-110"
              aria-label="Remove image"
            >
              <XIcon />
            </button>
          </div>

          {notice && (
            <Alert
              type={notice.type}
              title={notice.title}
              message={notice.message}
              details={notice.details}
              onClose={() => setNotice(null)}
            />
          )}

          {/* Question Input */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
              Ask a question about this screenshot:
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Explain this concept, What does this mean?, Summarize this..."
              className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
            />
          </div>

          {/* Ask AI Button */}
          <div className="px-5">
            <button
              onClick={() => onSend(question || "Please analyze and explain this screenshot")}
              disabled={!extractedText.trim()}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5
                bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600
                hover:from-indigo-600 hover:via-purple-600 hover:to-violet-700
                active:scale-98
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                focus:outline-none focus:ring-4 focus:ring-purple-500/30
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Ask AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenshotUpload;