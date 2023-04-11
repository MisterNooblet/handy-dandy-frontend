'use client';
import React from 'react';
import MiniNavbar from '../layoutComponents/MiniNavbar';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const links = [
  {
    name: 'Articles',
    path: '/admin/articles',
  },
  {
    name: 'Users',
    path: 'admin/users',
  },
  {
    name: 'Materials',
    path: 'admin/materials',
  },
  {
    name: 'Tools',
    path: 'admin/tools',
  },
];

const layout = () => {
  return (
    <>
      <MiniNavbar links={links} />
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default layout;
