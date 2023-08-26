import React from 'react';
import MiniNavbar from '../layoutComponents/MiniNavbar';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const links = [
  {
    name: 'Articles',
    path: 'articles'
  },
  {
    name: 'Users',
    path: 'users'
  },
  {
    name: 'Materials',
    path: 'materials'
  },
  {
    name: 'Tools',
    path: 'tools'
  },
  {
    name: 'Warehouse',
    path: 'warehouses'
  },
  {
    name: 'Library',
    path: 'libraries'
  }
];

const AdminLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
