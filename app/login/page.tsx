'use client';
import React from 'react';
import LoginForm from './components/LoginForm';
import { Container } from '@mui/material';

const page = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <LoginForm />
      </Container>
    </>
  );
};

export default page;
