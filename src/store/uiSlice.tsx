import { createSlice } from '@reduxjs/toolkit';
import { UiMessage } from 'utils/models';

export interface UiState {
  isLoading: boolean;
  message: UiMessage | null;
  alertOpen: boolean;
}

const initialState = {
  isLoading: false,
  message: null,
  alertOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.alertOpen = true;
    },
    setAlertOpen: (state, action) => {
      state.alertOpen = action.payload;
    },
  },
});

export const { setLoading, clearMessage, setMessage, setAlertOpen } = uiSlice.actions;
export const selectUser = (state: { ui: UiState }) => state.ui;
export default uiSlice;
