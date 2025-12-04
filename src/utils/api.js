const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
      credentials: 'include',
      ...options,
    };

    console.log('📤 API Request:', {
      method: config.method || 'GET',
      url: url,
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

        if (response.status === 401) {
          const refreshed = await this.refreshToken().catch(() => false);
          if (refreshed) {
            const retryRes = await fetch(url, config);
            const retryData = await retryRes.json().catch(() => ({}));
            if (!retryRes.ok) {
              const retryErrorMessage = retryData.message || retryData.error || `HTTP error! status: ${retryRes.status}`;
              throw new Error(retryErrorMessage);
            }
            return retryData;
          }

          localStorage.removeItem('ai-knowledge-user');
          console.warn('🔐 Session expired - user cleared');
          throw new Error('Session expired. Please login again.');
        }

        const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (!data || typeof data !== 'object') {
        console.error('❌ Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }

      console.log('✅ API Request successful');
      return data;
    } catch (error) {
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

  async logout() {
    const response = await this.request('/auth/logout', {
      method: 'POST',
    });
    return response;
  }

  async refreshToken() {
    try {
      const res = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  async me() {
    const response = await this.request('/auth/me');
    return response;
  }

  // Upload methods
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseURL}/upload/file`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await this.refreshToken().catch(() => false);
          if (refreshed) {
            const retryResponse = await fetch(`${this.baseURL}/upload/file`, {
              method: 'POST',
              credentials: 'include',
              body: formData,
            });
            const retryData = await retryResponse.json().catch(() => ({}));
            if (!retryResponse.ok) {
              const retryErrorMessage = retryData.message || retryData.error || `Upload failed: ${retryResponse.status}`;
              throw new Error(retryErrorMessage);
            }
            return retryData;
          }

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

  // AI methods - Using backend Groq endpoint (with auth)
  async generateAnswer(question, context, answerType) {
    console.log('🤖 Using backend for AI generation');
    console.log('📝 Question:', question.substring(0, 100));
    console.log('🎯 Answer Type:', answerType);

    try {
      const response = await this.request('/ai/ask', {
        method: 'POST',
        body: JSON.stringify({
          question,
          context: context || '',
          answerType: answerType || 'explanation'
        })
      });

      if (!response?.data?.answer) {
        throw new Error('No answer received from backend');
      }

      console.log('✅ AI answer received from backend, length:', response.data.answer.length);

      return {
        success: true,
        data: {
          answer: response.data.answer,
          question,
          answerType
        }
      };
    } catch (backendError) {
      console.warn('⚠️ Backend AI failed, falling back to Worker:', backendError?.message || backendError);

      try {
        const workerRes = await fetch('https://education.learnwise-ai.workers.dev/api/ask-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: question,
            answerType: answerType || 'explanation'
          })
        });

        const data = await workerRes.json();

        console.log('📥 Cloudflare Worker Response:', {
          status: workerRes.status,
          ok: workerRes.ok,
          hasAnswer: !!data.answer
        });

        if (!workerRes.ok) {
          console.error('❌ Worker Error:', data);
          throw new Error(data.error || 'Failed to generate answer from AI worker');
        }

        if (!data.answer) {
          throw new Error('No answer received from AI worker');
        }

        console.log('✅ AI answer received from Worker, length:', data.answer.length);

        return {
          success: true,
          data: {
            answer: data.answer,
            question: question,
            answerType: answerType
          }
        };
      } catch (workerError) {
        console.error('❌ Cloudflare Worker Error:', workerError);
        throw workerError;
      }
    }
  }

  async getHistory() {
    const response = await this.request('/ai/history');
    return response;
  }
}

export default new ApiService();
