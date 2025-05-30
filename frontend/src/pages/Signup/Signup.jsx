import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';
import './Signup.css';
import { isValidEmail, isValidPassword, passwordValidationErrors } from '../../utils/validationUtils';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      if(username==="" || password==="" || email==="") {
        setError('Fields cannot be empty');
        return;
      }

      if(!isValidEmail(email)) {
        setError('Not a valid Email');
        return;
      }

      if(!isValidPassword(password)) {
        setError(passwordValidationErrors(password));
        return;
      }

      const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/auth/signup/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });

      const data = await resp.json();

      if (!data.success) {
        toast.error(data.message || 'Signup failed');
        setError(data.message || 'Signup failed');
        return;
      }

      toast.success('Signup successful! Redirecting to stats...');
      dispatch(loginSuccess(data));
      navigate('/stats');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>

        <label className="signup-label">Username:</label>
        <input
          className="signup-input"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="signup-label">Email:</label>
        <input
          className="signup-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="signup-label">Password:</label>
        <input
          className="signup-input"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="signup-error">{error}</div>}

        <a href="/login" className="toggle-link">
          Already have an account? Login
        </a>

        <button className="signup-button" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
