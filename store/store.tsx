import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    api: apiSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>
export default store;
