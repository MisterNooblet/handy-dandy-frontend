'use client';
import { Container } from '@mui/material';
import '../styles/globalstyle.css';
import Footer from './layoutComponents/Footer';
import Navbar from './layoutComponents/Navbar';
import StoreAndAuthProvider from './layoutComponents/StoreAndAuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/styles/muiTheme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="../styles/globalstyle.css" />
        <title>Handy Dandy</title>
      </head>
      <body>
        <StoreAndAuthProvider>
          <ThemeProvider theme={theme}>
            <header>
              <Navbar />
            </header>
            <Container sx={{ flexGrow: 1 }}>
              <section>{children}</section>
            </Container>
            <Footer />
          </ThemeProvider>
        </StoreAndAuthProvider>
      </body>
    </html>
  );
}
