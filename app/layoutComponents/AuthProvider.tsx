import React from 'react';
import { API_BASE_PATH } from '@/utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, login, logout, updateUser } from '@/store/authSlice';
import { RootState } from '@/store/store';
import axios from 'axios';

const fetchUser = async () => {
  const result = await axios.get(`${API_BASE_PATH}auth/current-user`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM4NTk0MjBjOGEwNTVjZTgwYTc5NCIsImlhdCI6MTY4MDYzOTM4MSwiZXhwIjoxNjgzMjMxMzgxfQ.meu4jb_89ajEGYSIcsiha-Q1mI5Az-BiYW9kftwIWEw',
    },
  });
  console.log(result);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const dispatch = useDispatch();
  fetchUser();

  useEffect(() => {
    console.log('running');
    console.log(API_BASE_PATH);
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
