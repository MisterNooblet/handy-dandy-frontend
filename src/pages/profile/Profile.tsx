import Box from '@mui/material/Box';
import React from 'react';
import ControlledAccordions from './components/Accordion';

const Profile = () => {
  return (
    <Box sx={{ pt: 6, pb: 6, flexGrow: 1 }}>
      <ControlledAccordions />
    </Box>
  );
};

export default Profile;
