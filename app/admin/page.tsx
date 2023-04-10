'use client';
import { AuthState } from '@/store/authSlice';
import { RootState } from '@/store/store';
import greetUser from '@/utils/Greet';
import { fetchActiveWarehouse } from '@/utils/apiData';
import { Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const [warehouse, setWarehouse] = useState();

  const fetchData = async () => {
    const warehouseData = await fetchActiveWarehouse();
    console.log(warehouseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Box sx={{ display: 'flex' }}>{`${greetUser()}, ${user.user?.fullName}`} what needs managing?</Box>;
};

export default Page;
