import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Copyright({ sx }: { sx: object }) {
  return (
    <Typography variant="body2" component="div" color="#fff" sx={{ display: 'inline' }} {...sx}>
      {'Copyright © '}
      <Link to={'/'}>
        <Typography sx={{ display: 'inline' }} color={'#EDF1D6'}>
          Handy Dandy
        </Typography>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Copyright sx={{ mt: 5, margin: '20px 0' }} />
    </Box>
  );
};

export default Footer;
