import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'store/authSlice';
import { fetchUser } from 'utils/apiAuth';
import { getAuthCookie } from 'utils/cookieManager';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const tokenExists = getAuthCookie();
      if (tokenExists) {
        const response = await fetchUser();
        dispatch(
          login({
            id: response.id,
            toolbox: response.toolbox,
            fullName: response.fullName,
            role: response.role,
            favourites: response.favourites,
            pfp: response.pfp,
            email: response.email,
            country: response.country,
          })
        );
      }
    };
    getUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
