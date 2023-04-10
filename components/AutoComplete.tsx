import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ array, label }: { array: { label: string }[]; label: string }) {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={array}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
