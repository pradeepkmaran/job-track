import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Stats from './pages/Stats/Stats';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function getSession() {
      try {
        const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/session/me`, {
          method: 'GET',
          credentials: 'include'
        });

        if (resp.ok) {
          const data = await resp.json();
          const log = {user: data}
          dispatch(loginSuccess(log));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        dispatch(logout());
      }
    }

    getSession();
  }, [dispatch]); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
