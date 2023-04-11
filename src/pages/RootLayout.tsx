import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './layoutComponents/Footer';
import Navbar from './layoutComponents/Navbar';
import StoreAndAuthProvider from './layoutComponents/StoreAndAuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/muiTheme';

export default function RootLayout() {
  return (
    <StoreAndAuthProvider>
      <ThemeProvider theme={theme}>
        <header>
          <Navbar />
        </header>
        <Outlet />
        <Footer />
      </ThemeProvider>
    </StoreAndAuthProvider>
  );
}
