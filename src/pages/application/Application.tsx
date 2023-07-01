import Container from '@mui/material/Container';
import React from 'react';
import AuthorApplication from './components/AuthorApplication';
import { useParams } from 'react-router-dom';
import AuthorApplicationStepper from './components/AuthorApplicationStepper';

const Application = () => {
  const params = useParams();
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
      <AuthorApplicationStepper />
    </Container>
  );
};

export default Application;
