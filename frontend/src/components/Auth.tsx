import { useState } from 'react';
import axios from 'axios';

interface AuthProps {
  onLogin: (token: string) => void;
}

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
        onLogin(res.data.token);
      } else {
        await axios.post(`${API_URL}/api/v1/auth/register`, { email, password });
        // Auto login on register
        const res = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
        onLogin(res.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h1>FYP</h1>
        <p style={{color: 'var(--text-secondary)'}}>Find Your Paper using Semantic AI</p>
      </div>

      <div className="auth-form glass-panel">
        <h2 style={{marginBottom: '1.5rem', textAlign: 'center'}}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{width: '100%'}} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </a>
        </div>
      </div>
    </div>
  );
}
