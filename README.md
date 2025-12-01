# Education AI Frontend

Modern React frontend for the AI-powered educational assistant application.

## Features

- 🎨 Beautiful, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🌓 Dark/Light theme support
- 📄 PDF file upload and text extraction
- 🖼️ Image/Screenshot upload with OCR
- ✍️ Manual text input
- 🤖 AI-powered question answering
- 📊 Real-time response rendering with Markdown support

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (with inline SVG fallbacks)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AIResponseSection.jsx
│   │   ├── AISettings.jsx
│   │   ├── ExtractedTextPreview.jsx
│   │   ├── Header.jsx
│   │   ├── MainWorkspace.jsx
│   │   ├── ManualTextInput.jsx
│   │   ├── MarkdownRenderer.jsx
│   │   ├── PDFUpload.jsx
│   │   ├── ScreenshotUpload.jsx
│   │   └── UploadTabs.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── utils/           # Utility functions
│   │   └── api.js       # API service
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── vite.config.js       # Vite configuration
```

## API Integration

The frontend communicates with the backend through the `api.js` service located in `src/utils/`. All API calls are centralized here for easy maintenance.

### Authentication
- User tokens are stored in `localStorage` as `ai-knowledge-token`
- User data is stored in `localStorage` as `ai-knowledge-user`
- Automatic token injection for authenticated requests

### Error Handling
- Network errors are caught and displayed to users
- 401 errors automatically clear tokens and redirect to login
- User-friendly error messages throughout the application

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

## Features Overview

### Upload Methods
1. **PDF Upload**: Drag & drop or click to upload PDF files
2. **Screenshot Upload**: Upload images for OCR text extraction
3. **Manual Text Input**: Direct text input with word/character count

### AI Features
- Multiple answer types: Explanation, Code, Step-by-Step, Comparison, Quick Tip
- Customizable settings: Highlight keywords, Include examples, Code snippets
- Markdown rendering for formatted responses
- Copy and download response functionality

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
