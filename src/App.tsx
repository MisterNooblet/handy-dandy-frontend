import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';
import {
  Error404,
  Toolbox,
  Home,
  RootLayout,
  Signup,
  Login,
  Admin,
  AdminLayout,
  Wiki,
  Item,
  Profile,
  Article,
  Favorites,
  Author,
  Application,
  ErrorUserNotLoggedIn,
} from './pages/';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';

import {
  ArticleManager,
  LibraryManager,
  MasterDocManager,
  ItemManager,
  UserManager,
  WarehouseManager,
} from 'pages/admin';
import AuthorApplication from 'pages/admin/applications/AuthorApplication';
function App() {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <Error404 />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/wiki', element: <Wiki /> },
        { path: '/wiki/:type', element: <Wiki /> },
        { path: '/wiki/:type/c/:category', element: <Wiki /> },
        { path: '/wiki/:type/c/:category/items/:subCategory', element: <Wiki /> },
        { path: '/wiki/:type/c/:category/items/:subCategory/item/:id', element: <Item /> },
        { path: '/library/:type', element: <Wiki /> },
        { path: '/library/:type/c/:category', element: <Wiki /> },
        { path: '/library/:type/c/:category/items/:subCategory', element: <Wiki /> },
        { path: '/library/:type/c/:category/items/:subCategory/item/:id', element: <Article /> },
        { path: '/toolbox', element: user ? <Toolbox /> : <ErrorUserNotLoggedIn /> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'favorites', element: <Favorites /> },
        {
          path: 'author',
          element: user?.role === 'admin' || user?.role === 'author' ? <Author /> : <Error404 />,
        },
        {
          path: '/apply/:type',
          element: user ? <Application /> : <ErrorUserNotLoggedIn />,
        },
        {
          path: 'admin',
          element: user?.role === 'admin' ? <AdminLayout /> : <Error404 />,
          children: [
            { path: '', element: <Admin /> },
            { path: 'articles', element: <ArticleManager /> },
            { path: 'materials', element: <ItemManager type="material" /> },
            { path: 'tools', element: <ItemManager type="tool" /> },
            { path: 'users', element: <UserManager /> },
            { path: 'warehouses', element: <WarehouseManager /> },
            { path: 'warehouses/:id', element: <MasterDocManager target="warehouse" /> },

            { path: 'libraries', element: <LibraryManager /> },
            { path: 'libraries/:id', element: <MasterDocManager target="library" /> },
            { path: 'authorapplications/:id', element: <AuthorApplication /> },
          ],
        },
        { path: '/profile', element: user ? <Profile /> : <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
