import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

const ErrorUserNotLoggedIn = () => {
  return (
    <>
      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
        You need to be logged in to use this feature <ReportIcon sx={{ color: 'red' }} />
      </Typography>
      <Link to={'/login'}>
        <Button>Login?</Button>
      </Link>
    </>
  );
};

export default ErrorUserNotLoggedIn;
