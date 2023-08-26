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
import LoadingSpinner from 'components/Backdrop';
import { Container } from '@mui/material';

export default function RootLayout() {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  return (
    <StoreAndAuthProvider>
      <ThemeProvider theme={theme}>
        <header>
          <Navbar />
        </header>
        <Container maxWidth='xl' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: 3, pb: 3, rowGap: 3 }}>
          <Outlet />
        </Container>
        <ScrollToTopButton />
        {user && <Chat />}
        <CustomizedSnackbar />
        <Footer />
        <LoadingSpinner />
      </ThemeProvider>
    </StoreAndAuthProvider>
  );
}
