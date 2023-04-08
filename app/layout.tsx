'use client';
import '../styles/globalstyle.css';
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
        </StoreAndAuthProvider>
      </body>
    </html>
  );
}
