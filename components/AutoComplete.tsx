import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ array }: { array: { label: string }[] }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={array}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
