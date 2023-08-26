import Box from '@mui/material/Box';
import React from 'react';
import ControlledAccordions from './components/Accordion';
import { Container } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth='xl' sx={{ flexGrow: 1 }}>
      <Box sx={{ pt: 6, pb: 6, flexGrow: 1 }}>
        <ControlledAccordions />
      </Box>
    </Container>
  );
};

export default Profile;
