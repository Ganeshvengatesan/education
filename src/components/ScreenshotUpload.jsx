import React, { useState, useRef } from 'react';

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

function ScreenshotUpload({ theme = 'light', setExtractedText }) {
  const [image, setImage] = useState(null); // base64 string
  const [isDragging, setIsDragging] = useState(false);
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

      try {
        const response = await apiService.uploadFile(file);
        setExtractedText(response.extractedText);
      } catch (error) {
        setExtractedText(`Error extracting text: ${error.message}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setExtractedText('');
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
            />
            <label
              htmlFor="screenshot-input"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-indigo-600 hover:to-violet-700 transform hover:scale-105 transition-all duration-200"
            >
              Choose Image
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

          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              OCR Processing Status
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Image uploaded successfully • Ready for text extraction via OCR
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScreenshotUpload;