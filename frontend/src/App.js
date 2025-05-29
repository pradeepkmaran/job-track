import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Stats from './pages/Stats/Stats';
import ApplicationAddPage from './pages/AddDetails/AddDetailsPage';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './store/authSlice';
import { Navigate } from 'react-router-dom';

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
        <Route path="/stats" element={user ? <Stats /> : <Navigate to="/login" replace />} />
        <Route path="/application/new" element={<ApplicationAddPage /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
