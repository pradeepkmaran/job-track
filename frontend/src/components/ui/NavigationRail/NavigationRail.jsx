// src/components/NavigationRail.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, Tooltip, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import Cookies from 'js-cookie';

const navItems = [
  // { icon: <DashboardIcon />, path: '/', label: 'Dashboard' },
  { icon: <DashboardIcon />, path: '/', label: 'Dashboard' },
  { icon: <ArticleIcon />, path: '/application/new', label: 'New Application' },
  { icon: <AssessmentIcon />, path: '/stats', label:  'Stats' },
];

export default function NavigationRail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    dispatch(logout());
    Cookies.remove('SESSION')
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 80,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 80,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: 'white',
        },
      }}
    >
      <List>
        {navItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.path}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '20px 0',
                  color: 'white',
                }}
              >
                <ListItemIcon sx={{ color: 'white', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
        <Divider sx={{ my: 1, background: '#333' }} />
        <Tooltip title="Logout" placement="right">
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 0',
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ color: 'white', justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
}
