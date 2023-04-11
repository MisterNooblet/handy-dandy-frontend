'use client';
import React from 'react';
import SignUpForm from './components/SignUpForm';
import { Container } from '@mui/material';

const Signup = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <SignUpForm />
      </Container>
    </>
  );
};

export default Signup;
