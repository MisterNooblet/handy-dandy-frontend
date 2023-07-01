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
  setState,
}: {
  name: string;
  label: string;
  title: string;
  type: string;
  fieldIdx: number;
  setState?: React.Dispatch<React.SetStateAction<string>>;
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
      fullWidth
      label={label}
      title={title}
      sx={{ backgroundColor: message?.code === fieldIdx ? 'rgba(245, 132, 132, 0.44)' : null }}
      margin="normal"
      onFocus={() => {
        dispatch(setMessage(null));
      }}
      onChange={(e) => {
        if (setState) setState(e.target.value);
      }}
    ></TextField>
  );
};

export default FormInput;
