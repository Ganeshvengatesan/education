const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://education-backend-l1sy.onrender.com/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('ai-knowledge-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Auth token present:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No auth token found in localStorage');
    }

    console.log('📤 API Request:', {
      method: config.method || 'GET',
      url: url,
      hasToken: !!token,
      headers: Object.keys(config.headers)
    });

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));

      console.log('📥 API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        hasData: !!data
      });

      if (!response.ok) {
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });

        // Handle different error types
        if (response.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('ai-knowledge-token');
          localStorage.removeItem('ai-knowledge-user');
          console.warn('🔐 Session expired - tokens cleared');
          throw new Error('Session expired. Please login again.');
        }

        const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Validate response structure
      if (!data || typeof data !== 'object') {
        console.error('❌ Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }

      console.log('✅ API Request successful');
      return data;
    } catch (error) {
      // Network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }

      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    const formData = new URLSearchParams();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await this.request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    return response;
  }

  async register(userData) {
    const formData = new URLSearchParams();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    const response = await this.request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    return response;
  }

  // Upload methods
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('ai-knowledge-token');

    try {
      const response = await fetch(`${this.baseURL}/upload/file`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('ai-knowledge-token');
          localStorage.removeItem('ai-knowledge-user');
          throw new Error('Session expired. Please login again.');
        }

        const errorMessage = data.message || data.error || `Upload failed: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from server');
      }

      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  }

  async uploadText(text) {
    const response = await this.request('/upload/text', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return response;
  }

  // AI methods - Using Cloudflare Worker (bypasses backend issues)
  async generateAnswer(question, context, answerType) {
    console.log('🌐 Using Cloudflare Worker for AI generation');
    console.log('📝 Question:', question.substring(0, 100));
    console.log('🎯 Answer Type:', answerType);

    try {
      const response = await fetch('https://education.learnwise-ai.workers.dev/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          answerType: answerType || 'explanation'
        })
      });

      const data = await response.json();

      console.log('📥 Cloudflare Worker Response:', {
        status: response.status,
        ok: response.ok,
        hasAnswer: !!data.answer
      });

      if (!response.ok) {
        console.error('❌ Worker Error:', data);
        throw new Error(data.error || 'Failed to generate answer from AI worker');
      }

      if (!data.answer) {
        throw new Error('No answer received from AI worker');
      }

      console.log('✅ AI answer received, length:', data.answer.length);

      // Return in format expected by Dashboard
      return {
        success: true,
        data: {
          answer: data.answer,
          question: question,
          answerType: answerType
        }
      };
    } catch (error) {
      console.error('❌ Cloudflare Worker Error:', error);
      throw error;
    }
  }

  async getHistory() {
    const response = await this.request('/ai/history');
    return response;
  }
}

export default new ApiService();
