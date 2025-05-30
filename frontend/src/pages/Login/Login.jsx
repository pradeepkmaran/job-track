import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';
import { isValidEmail } from '../../utils/validationUtils';
import './Login.css';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggleLoginMethod = (e) => {
    e.preventDefault();
    setLoginWithEmail((prev) => !prev);
  };

  const handleLogin = async () => {
    if(identifier==="") {
      setError(`${loginWithEmail ? "Email" : "Username"} cannot be empty`);
      return;
    }
    if(loginWithEmail && !isValidEmail(identifier)) {
      setError("Not a valid Email");
      return;
    }
    if(password==="") {
      setError('Password cannot be empty');
      return;
    }

    const credentials = loginWithEmail
      ? { username: '', email: identifier, password }
      : { username: identifier, email: '', password };

    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/auth/login`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(credentials),
          credentials: 'include'
        }
      );

      const data = await resp.json();

      if (!data.success) {
        toast.error(data.message || 'Login failed');
        setError(data.message || 'Login failed');
        return;
      }

      dispatch(loginSuccess(data));
      setError('');
      navigate('/');
      toast.success('Login successful!');
    } catch (err) {
      toast.error('Login failed. Please try again.');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <label className="login-label">
          {loginWithEmail ? 'Email' : 'Username'}:
        </label>
        <input
          className="login-input"
          type={loginWithEmail ? 'email' : 'text'}
          placeholder={loginWithEmail ? 'Enter your email' : 'Enter your username'}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label className="login-label">Password:</label>
        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="login-error">{error}</div>}

        <a href='/' onClick={handleToggleLoginMethod} className="toggle-link">
          Use {loginWithEmail ? 'username' : 'email'} instead?
        </a>

        <a href="/signup" className="toggle-link">
          Dont have an account? Signup
        </a>

        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
