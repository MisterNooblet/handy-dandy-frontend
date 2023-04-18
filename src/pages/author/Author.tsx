import Container from '@mui/material/Container';
import { ArticleManager } from 'pages/admin';
import React from 'react';

const Author = () => {
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
      <ArticleManager />
    </Container>
  );
};

export default Author;
