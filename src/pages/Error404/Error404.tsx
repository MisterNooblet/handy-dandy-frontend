import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

const Error404 = () => {
  return (
    <Container
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
        Oops looks like the page you were trying to access does not exist <ReportIcon sx={{ color: 'red' }} />
      </Typography>
      <Link to={'/'}>
        <Button>Home?</Button>
      </Link>
    </Container>
  );
};

export default Error404;
