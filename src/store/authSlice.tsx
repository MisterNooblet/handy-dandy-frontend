'use client';
import { AnyAction, Dispatch, createSlice } from '@reduxjs/toolkit';
import { User } from 'utils/models';
import { RootState } from './store';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null as User | null,
};

interface LoginAction {
  payload: {
    id: string;
    toolbox: unknown[];
    fullName: string;
    email: string;
    role: 'admin' | 'user' | 'author';
    favourites: unknown[];
    country: string;
    pfp: string;
  };
  type: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateTools: (state, action) => {
      if (state.user) {
        state.user.toolbox.tools.push(action.payload);
      }
    },
    updateMaterials: (state, action) => {
      if (state.user) {
        state.user.toolbox.materials.push(action.payload);
      }
    },
    setToolBox: (state, action) => {
      if (state.user) {
        state.user.toolbox = action.payload;
      }
    },
    updateUserPfp: (state, action) => {
      if (state.user) {
        state.user.pfp = action.payload;
      }
    },
  },
});

export const { login, logout, updateUser, updateTools, updateMaterials, setToolBox, updateUserPfp } = authSlice.actions;
export const selectUser = (state: { user: AuthState }): User | null => state.user.user;
export default authSlice;