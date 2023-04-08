'use client';
import { AnyAction, Dispatch, createSlice } from '@reduxjs/toolkit';
import { User } from '@/utils/models';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null as User | null,
};

export interface AuthDispatch extends Dispatch<AnyAction> {
  login: ({}) => void;
  logout: () => void;
  updateUser: () => void;
  updateTools: () => void;
  updateMaterials: () => void;
  setToolBox: () => void;
  updateUserPfp: () => void;
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

export const {
  login,
  logout,
  updateUser,
  updateTools,
  updateMaterials,
  setToolBox,
  updateUserPfp,
} = authSlice.actions;
export const selectUser = (state: { user: AuthState }): User | null =>
  state.user.user;
export default authSlice;
