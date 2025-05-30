import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Stats from './pages/Stats/Stats';
import DashboardPage from './pages/Dashboard/Dashboard';
import ApplicationDetailsPage from './pages/ApplicationDetails/ApplicationDetailsPage';
import ApplicationEditPage from './pages/ApplicationEdit/ApplicationEditPage';
import ApplicationAddPage from './pages/ApplicationAdd/ApplicationAddPage';
import NavigationRail from './components/ui/NavigationRail/NavigationRail';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './store/authSlice';

import './assets/global.css';

function AppLayout() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user && <NavigationRail />}
      <Outlet />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/session/me`, {
          method: 'GET',
          credentials: 'include'
        });

        if (resp.ok) {
          const data = await resp.json();
          const log = { user: data };
          dispatch(loginSuccess(log));
          setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={user ? <DashboardPage /> : <Navigate to="/login" replace />} />
          <Route path="/application/new" element={user ? <ApplicationAddPage /> : <Navigate to='/login' replace />} />
          <Route path="/application/:id" element={user ? <ApplicationDetailsPage /> : <Navigate to='/login' replace />} />
          <Route path="/application/:id/edit" element={user ? <ApplicationEditPage /> : <Navigate to='/login' replace />} />
          <Route path="/stats" element={user ? <Stats /> : <Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
