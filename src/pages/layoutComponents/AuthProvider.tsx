import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, login } from 'store/authSlice';
import { RootState } from 'store/store';
import { fetchUser } from 'utils/apiAuth';
import { getAuthCookie } from 'utils/cookieManager';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();

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

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (user.user) {
  //   }
  //   // eslint-disable-next-line
  // }, [user.user]);
  return <>{children}</>;
};

export default AuthProvider;