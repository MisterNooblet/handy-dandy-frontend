import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertOpen, UiState } from 'store/uiSlice';
import { RootState } from 'store/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar() {
  const dispatch = useDispatch();
  const { alertOpen, message } = useSelector((state: RootState) => state.ui) as UiState;
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      dispatch(setAlertOpen(false));
      return;
    } else {
      dispatch(setAlertOpen(false));
    }
  };

  return (
    <>
      {message && (
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message?.severity ? message.severity : 'info'} sx={{ width: '100%' }}>
            {message?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
