import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, login, logout, updateUser } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { fetchUser } from '@/utils/apiAuth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await fetchUser();
    dispatch.login();
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user.user) {
    }
    // eslint-disable-next-line
  }, [user.user]);
  return <>{children}</>;
};

export default AuthProvider;
