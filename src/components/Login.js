import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import './AuthStyles.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign In button clicked', { email, password });
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('API Response:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/users');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Sign Up Button */}
        <Link to="/register">
        <button type="submit" className="auth-button">
          SIGN UP
        </button>
        </Link>

        {/* User Avatar */}
        <div className="user-avatar">
          <div className="user-avatar-inner">
            <div className="user-avatar-head"></div>
            <div className="user-avatar-body"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username Input */}
          <div className="input-container">
            <div className="input-icon">👤</div>
            <input
              type="email"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <div className="input-icon">🔒</div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          {/* Remember me checkbox */}
          <div className="remember-section">
            <input type="checkbox" className="remember-checkbox" />
            <span>Remember me</span>
            <a href="/" className="forgot-password">Forgot your password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="auth-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;