import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage  from './pages/Dashboard/index';
import ApplicationDetailsPage from './pages/ApplicationDetails/ApplicationDetailsPage';
import ApplicationEditPage from './pages/ApplicationEdit/ApplicationEditPage';
import ApplicationAddPage from './pages/ApplicationAdd/ApplicationAddPage'

import './assets/global.css';

function App() { 
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />}/>
        <Route path="/application/:id" element={<ApplicationDetailsPage />} />
        <Route path ="/application/:id/edit" element={<ApplicationEditPage />} />
        <Route path ="/add" element={<ApplicationAddPage />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;