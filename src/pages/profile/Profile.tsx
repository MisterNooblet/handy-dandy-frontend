import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import ControlledAccordions from './components/Accordion';

const Profile = () => {
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 6, pb: 6 }}>
      <ControlledAccordions />
    </Container>
  );
};

export default Profile;
