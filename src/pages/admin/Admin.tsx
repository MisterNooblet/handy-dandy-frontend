import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import greetUser from 'utils/Greet';
import { advancedRequest, fetchActiveWarehouse } from 'utils/apiData';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable from './components/DataTable';
import { useState } from 'react';

const Admin = () => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const [data, setData] = useState([]);
  //   const [warehouse, setWarehouse] = useState();

  const fetchData = async () => {
    const users = await advancedRequest('articles');
    setData(users);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>{`${greetUser()}, ${user.user?.fullName}`} what needs managing?</Typography>
      <DataTable data={data} />
    </Box>
  );
};

export default Admin;
