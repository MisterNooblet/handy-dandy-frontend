import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './layoutComponents/Footer';
import Navbar from './layoutComponents/Navbar';
import StoreAndAuthProvider from './layoutComponents/StoreAndAuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/muiTheme';
import CustomizedSnackbar from 'components/AlertSnackbar';
import ScrollToTopButton from 'components/ScrollToTopButton';
import Chat from './layoutComponents/Chat';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

export default function RootLayout() {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  return (
    <StoreAndAuthProvider>
      <ThemeProvider theme={theme}>
        <header>
          <Navbar />
        </header>
        <Outlet />
        <ScrollToTopButton />
        {user?.role === 'admin' && <Chat />}
        <CustomizedSnackbar />
        <Footer />
      </ThemeProvider>
    </StoreAndAuthProvider>
  );
}
