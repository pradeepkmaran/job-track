import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggleLoginMethod = (e) => {
    e.preventDefault();
    setLoginWithEmail(prev => !prev);
  };

  const handleLogin = async () => {
    const credentials = loginWithEmail
      ? { username: "", email: identifier, password }
      : { username: identifier, email: "", password };

    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await resp.json();

      if (!data.success) {
        setError(data.message || 'Login failed');
        return;
      }

      dispatch(loginSuccess(data));
      setError('');
      navigate('/stats');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <label>{loginWithEmail ? 'Email' : 'Username'}:</label>
      <input
        placeholder={loginWithEmail ? 'Enter your email' : 'Enter your username'}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <>
          <strong style={{ color: 'red' }}>{error}</strong>
        </>
      )}

      <br />

      <a href="" onClick={handleToggleLoginMethod}>
        Use {loginWithEmail ? 'username' : 'email'} instead?
      </a>

      <br /><br />

      <button onClick={handleLogin}>
        Log in
      </button>      
    </div>
  );
};

export default LoginPage;
