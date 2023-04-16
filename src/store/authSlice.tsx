import { createSlice } from '@reduxjs/toolkit';
import { User } from 'utils/models';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null as User | null,
};

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

export const { login, logout, updateUser, setToolBox, updateUserPfp } = authSlice.actions;
export const selectUser = (state: { user: AuthState }): User | null => state.user.user;
export default authSlice;
