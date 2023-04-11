import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';
import { Error404, Home, RootLayout, Signup, Login, Admin } from './pages/';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';

function App() {
  const user = useSelector((state: RootState) => state.auth) as AuthState;

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <Error404 />,
      children: [
        { path: '/', element: <Home /> },
        // { path: '/wiki', element: <Wiki /> },
        // { path: '/wiki/:category', element: <Wiki /> },
        // { path: '/wiki/:category/p/:subcategories', element: <Wiki /> },
        // { path: '/wiki/:category/p/:subcategories/tools/:tools', element: <Wiki /> },
        // { path: '/wiki/:category/p/:subcategories/tools/:tools/item/:name', element: <Item /> },
        // { path: '/toolbox', element: <Toolbox /> },
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        { path: '/admin', element: user.user?.role === 'admin' ? <Admin /> : <Error404 /> },
        // { path: '/profile', element: user.user ? <Profile /> : <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
