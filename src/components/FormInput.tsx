import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, UiState } from 'store/uiSlice';
import { RootState } from 'store/store';

const FormInput = ({
  name,
  label,
  title,
  type,
  fieldIdx,
}: {
  name: string;
  label: string;
  title: string;
  type: string;
  fieldIdx: number;
}) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.ui) as UiState;

  useEffect(() => {
    dispatch(setMessage(null));
  }, [dispatch]);
  return (
    <TextField
      type={type}
      name={name}
      required
      fullWidth
      label={label}
      title={title}
      sx={{ backgroundColor: message?.code === fieldIdx ? 'rgba(245, 132, 132, 0.44)' : null }}
      margin="normal"
      onFocus={() => {
        dispatch(setMessage(null));
      }}
    ></TextField>
  );
};

export default FormInput;
