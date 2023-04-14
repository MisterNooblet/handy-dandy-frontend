import { createSlice } from '@reduxjs/toolkit';
import { FormError } from 'utils/models';

export interface UiState {
  isLoading: boolean;
  errorMessage: FormError | null;
}

const initialState = {
  isLoading: false,
  errorMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setLoading, clearErrorMessage, setErrorMessage } = uiSlice.actions;
export const selectUser = (state: { ui: UiState }) => state.ui;
export default uiSlice;
