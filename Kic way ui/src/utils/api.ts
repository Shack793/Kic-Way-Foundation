import axios from 'axios';

// Set the base URL without the /api prefix since we'll include it in the endpoint paths
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log('API baseURL configured as:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log all errors for debugging
    console.error('API response error:', error);
    
    if (error.message === 'Network Error') {
      console.error('Network error details:', {
        baseURL: api.defaults.baseURL,
        message: 'Cannot connect to API server'
      });
      // You could also dispatch an event or use a notification system here
    }
    
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
    
    // Add more specific error handling here if needed
    if (error.response && error.response.status === 422) {
      // Validation errors
      console.error('Validation error:', error.response.data);
    }
    
    if (error.response && error.response.status === 403) {
      // Forbidden - could be due to email verification
      console.error('Forbidden error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;








