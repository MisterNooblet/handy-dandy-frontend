'use client';
import '../styles/globalstyle.css';
import Footer from './layoutComponents/Footer';
import Navbar from './layoutComponents/Navbar';
import StoreAndAuthProvider from './layoutComponents/StoreAndAuthProvider';

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
          <header>
            <Navbar />
          </header>
          <div className="container">
            <section>{children}</section>
          </div>
          <Footer />
        </StoreAndAuthProvider>
      </body>
    </html>
  );
}
