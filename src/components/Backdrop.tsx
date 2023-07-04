import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { UiState } from 'store/uiSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

export default function LoadingSpinner() {
  const { isLoading } = useSelector((state: RootState) => state.ui) as UiState;
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
