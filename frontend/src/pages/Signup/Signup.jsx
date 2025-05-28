import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/auth/signup/new`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await resp.json();

      if (!data.success) {
        setError(data.message || 'Signup failed');
        return;
      }

      dispatch(loginSuccess(data));
      navigate('/stats');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <label>Username:</label>
      <br />
      <input
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <label>Email:</label>
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <label>Password:</label>
      <br />
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {error && (
        <>
          <strong style={{ color: 'red' }}>{error}</strong>
          <br /><br />
        </>
      )}

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupPage;