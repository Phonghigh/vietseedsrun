import axios from 'axios';

// Base URL: Use .env file or fallback to localhost during development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add cache-busting parameter to GET requests
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Headers to bypass server-side caching
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';

    // Attempt to get token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response?.status === 401) {
      console.warn('Session unauthorized or expired for request to:', error.config?.url);
      
      // Clear potentially corrupt/invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      // Only redirect to landing if the user is on a protected/private page
      const protectedPaths = ['/profile'];
      const currentPath = window.location.pathname;
      
      if (protectedPaths.some(path => currentPath.startsWith(path))) {
        console.log('Redirecting to home from private page:', currentPath);
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
