'use client';
import React from 'react';
import MiniNavbar from '../layoutComponents/MiniNavbar';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const links = [
  {
    name: 'Articles',
    path: 'articles',
  },
  {
    name: 'Users',
    path: 'users',
  },
  {
    name: 'Materials',
    path: 'materials',
  },
  {
    name: 'Tools',
    path: 'tools',
  },
];

const AdminLayout = () => {
  return (
    <>
      <MiniNavbar links={links} />
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
