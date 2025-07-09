import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterStyles.css'; 

function Register() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register button clicked', { name, dateOfBirth, email, password });
    try {
      const res = await axios.post('http://localhost:5000/api/register', { name, dateOfBirth, email, password });
      console.log('API Response:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/users');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* User Avatar */}
        <div className="register-avatar">
          <div className="register-avatar-inner">
            <div className="register-avatar-head"></div>
            <div className="register-avatar-body"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Name Input */}
          <div className="register-input-container">
            <div className="register-input-icon">👤</div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Date of Birth Input */}
          <div className="register-input-container">
            <div className="register-input-icon">📅</div>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Email Input */}
          <div className="register-input-container">
            <div className="register-input-icon">✉️</div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="register-input-container">
            <div className="register-input-icon">🔒</div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>

        {/* Login link */}
        <p className="register-link">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;