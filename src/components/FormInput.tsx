import { FormError, MyObject } from 'utils/models';
import { TextField } from '@mui/material';
import React, { Dispatch } from 'react';

const FormInput = ({
  name,
  label,
  title,
  setErrorMsg,
  type,
  errorMsg,
  fieldIdx,
}: {
  name: string;
  label: string;
  title: string;
  setErrorMsg: Dispatch<FormError>;
  type: string;
  errorMsg: FormError | MyObject;
  fieldIdx: number;
}) => {
  return (
    <TextField
      type={type}
      name={name}
      required
      fullWidth
      label={label}
      title={title}
      sx={{ backgroundColor: errorMsg.code === fieldIdx ? 'rgba(245, 132, 132, 0.44)' : null }}
      margin="normal"
      onFocus={() => {
        setErrorMsg({ message: null, code: null });
      }}
    ></TextField>
  );
};

export default FormInput;
