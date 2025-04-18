import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use try-catch when accessing auth context to prevent crashes
  let auth = { login: async () => ({}) };
  try {
    auth = useAuth();
  } catch (err) {
    console.error("Error accessing auth context:", err);
  }
  
  const { login } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Form validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (typeof login !== 'function') {
        throw new Error('Login function not available');
      }
      
      console.log('Login component: Attempting login with:', { email });
      // The login function in AuthContext will handle the API call
      const response = await login(email, password);
      console.log('Login component: Login successful', response);
      setSuccess('Login successful!');
      
      // Update the redirect logic after successful login
      if (response.user && response.user.is_admin) {
        setTimeout(() => {
          // Close the modal if it exists
          const modal = document.querySelector('[data-login-modal]');
          if (modal) {
            modal.remove();
          }
          navigate('/admin');
        }, 1000);
      } else {
        setTimeout(() => {
          // Close the modal if it exists
          const modal = document.querySelector('[data-login-modal]');
          if (modal) {
            modal.remove();
          }
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      console.error('Login error in component:', err);
      
      // Handle specific error cases
      if (err.response?.status === 422) {
        setError('Invalid credentials. Please check your email and password.');
      } else if (err.response?.status === 403 && err.response?.data?.verification_needed) {
        setError('Email not verified. Please check your inbox for verification email.');
      } else if (err.response?.status === 429) {
        setError('Too many login attempts. Please try again later.');
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your internet connection or the API server might be down.');
      } else {
        setError(
          err.response?.data?.message || 
          err.message || 
          'Login failed. Please check your credentials.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setError('')}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#006839] hover:bg-[#005830] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : 'Login'}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <button 
              type="button" 
              className="text-[#006839] hover:underline"
              onClick={() => {
                // Find parent modal and close it
                const modal = document.querySelector('[data-login-modal]');
                if (modal) {
                  modal.remove();
                }
                // Trigger register modal
                document.querySelector('[data-register-button]')?.click();
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};












