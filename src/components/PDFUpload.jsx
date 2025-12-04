import React, { useState, useRef } from 'react';
import apiService from '../utils/api';
import Alert from './Alert';

// Inline SVG Icons (no lucide-react!)
const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function PDFUpload({ theme = 'light', setExtractedText }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      handleFile(selectedFile);
    }
  };

  const handleFile = async (selectedFile) => {
    setNotice(null);
    setFile(selectedFile);
    setIsUploading(true);

    try {
      const response = await apiService.uploadFile(selectedFile);
      if (response.data && response.data.extractedText) {
        setExtractedText(response.data.extractedText);
        setNotice({
          type: 'success',
          title: 'Upload complete',
          message: 'PDF processed successfully. Text extracted and ready to analyze.',
        });
      } else {
        throw new Error('No text extracted from file');
      }
    } catch (error) {
      console.error('File upload error:', error);
      const serverMsg = error.response?.data?.message;
      const serverDetails = error.response?.data?.details;
      setNotice({
        type: 'error',
        title: 'Upload failed',
        message: serverMsg || error.message || 'Failed to extract text from file. Please try again.',
        details: typeof serverDetails === 'string' ? serverDetails : undefined,
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setExtractedText('');
    setNotice(null);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-4 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-105 shadow-2xl'
            : theme === 'dark'
              ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
      >
        <div className="flex flex-col items-center gap-5">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isDragging ? 'bg-indigo-500/20' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
          }`}>
            <UploadIcon className={isDragging ? 'text-indigo-400' : theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
          </div>

          <div>
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
              {isDragging ? 'Drop your PDF here!' : 'Drop PDF here or click to upload'}
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Supports PDF files • Max 10MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload-input"
            disabled={isUploading}
          />
          <label
            htmlFor="pdf-upload-input"
            className={`inline-block px-8 py-3.5 font-semibold rounded-xl shadow-lg transform transition-all duration-200 
              ${isUploading
                ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-xl hover:from-indigo-600 hover:to-violet-700 hover:scale-105'
              }`
            }
          >
            {isUploading ? 'Uploading…' : 'Choose PDF File'}
          </label>
        </div>
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

      {/* Selected File Preview */}
      {file && (
        <div className={`flex items-center justify-between p-5 rounded-xl shadow-md border ${
          theme === 'dark' ? 'bg-slate-800/70 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <FileTextIcon className="text-white" />
            </div>
            <div>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
                {file.name}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {(file.size / 1024).toFixed(2)} KB • Ready to process
              </p>
            </div>
          </div>

          <button
            onClick={clearFile}
            className={`p-3 rounded-lg transition-all hover:scale-110 ${
              theme === 'dark'
                ? 'hover:bg-slate-700 text-slate-400'
                : 'hover:bg-slate-200 text-slate-600'
            }`}
            aria-label="Remove file"
          >
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default PDFUpload;