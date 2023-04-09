import { FormError } from '@/utils/models';
import { TextField } from '@mui/material';
import React, { Dispatch } from 'react';

const FormInput = ({
  name,
  label,
  title,
  style,
  setErrorMsg,
  type,
}: {
  name: string;
  label: string;
  title: string;
  style: {};
  setErrorMsg: Dispatch<FormError>;
  type: string;
}) => {
  return (
    <TextField
      type={type}
      name={name}
      required
      fullWidth
      label={label}
      title={title}
      sx={style}
      margin="normal"
      onFocus={() => {
        setErrorMsg({ message: null, code: null });
      }}
    ></TextField>
  );
};

export default FormInput;
