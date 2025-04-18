import React, { useState } from 'react';
import axios from 'axios';

const LoginTest: React.FC = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/login');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState<any>(null);

  const testLogin = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setRequestDetails(null);
    
    try {
      console.log('Sending login request to:', apiUrl);
      console.log('Request payload:', { email, password });
      
      // Record request details for debugging
      const requestInfo = {
        url: apiUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: { email, password }
      };
      setRequestDetails(requestInfo);
      
      // Make the actual request
      const response = await axios({
        url: apiUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: { email, password }
      });
      
      console.log('Response received:', response);
      setResult(response.data);
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.message === 'Network Error' || 
          (err.response?.status === 0 && err.message.includes('CORS'))) {
        console.error('POSSIBLE CORS ISSUE DETECTED');
      }
      
      // Detailed error information
      const errorDetails = {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers
      };
      
      setError(JSON.stringify(errorDetails, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-test" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>React Login Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="apiUrl" style={{ display: 'block', marginBottom: '5px' }}>API URL:</label>
        <input 
          type="text" 
          id="apiUrl" 
          value={apiUrl} 
          onChange={(e) => setApiUrl(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <button 
        onClick={testLogin} 
        disabled={loading}
        style={{ 
          padding: '10px 15px', 
          backgroundColor: loading ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Login'}
      </button>
      
      // Add buttons to test different URL formats
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => {
            setApiUrl('http://localhost:8000/api/login');
            setTimeout(testLogin, 100);
          }}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Test with /api/login
        </button>
        
        <button 
          onClick={() => {
            setApiUrl('http://localhost:8000/login');
            setTimeout(testLogin, 100);
          }}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Test with /login
        </button>
      </div>
      
      {requestDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Request Details:</h3>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(requestDetails, null, 2)}
          </pre>
        </div>
      )}
      
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Success Response:</h3>
          <pre style={{ backgroundColor: '#f0fff0', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      {error && (
        <div style={{ marginTop: '20px' }}>
          <h3>Error:</h3>
          <pre style={{ backgroundColor: '#fff0f0', padding: '10px', overflow: 'auto' }}>
            {error}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LoginTest;






