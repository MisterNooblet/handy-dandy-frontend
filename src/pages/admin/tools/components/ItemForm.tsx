import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FileUpload from 'components/FileUpload';
import FormInput from 'components/FormInput';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setMessage, UiState } from 'store/uiSlice';
import { CategorySelect } from 'utils/models';

interface itemFormProps {
  title: string;
  description: string;
  image: File;
  parentDoc: string;
  type: string;
  properties: string[];
}

const ItemForm = ({ target, type }: { target: CategorySelect; type: string }) => {
  const [file, setFile] = useState<undefined | File>(undefined);
  const [properties, setProperties] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.ui) as UiState;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const itemName = data.get('itemName') as string;
    const itemDescription = data.get('itemDescription') as string;
    if (itemDescription.length > 20 && itemName.length > 0 && file && properties.length > 0) {
      const newItem: itemFormProps = {
        title: itemName,
        description: itemDescription,
        parentDoc: target.id,
        image: file,
        type: type,
        properties: properties,
      };
      console.log(newItem);
    } else if (itemName.length === 0) {
      dispatch(setMessage({ message: 'Please provide a category title', code: 1, severity: 'error' }));
    } else if (itemDescription.length < 20) {
      dispatch(
        setMessage({
          message: 'Please provide a category description atleast 20chars long',
          code: 2,
          severity: 'error',
        })
      );
    }
  };
  console.log(target);
  return (
    <Box
      onFocus={() => {
        dispatch(setMessage(null));
      }}
      component="form"
      maxWidth={'400px'}
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}
    >
      <FormInput
        label={'Item Name'}
        name={'itemName'}
        title={'Please provide an item name'}
        fieldIdx={1}
        type={'text'}
      />
      <TextField
        name="itemDescription"
        label="Item Description"
        title="Please provide an item description 20chars long"
        multiline
        rows={4}
        fullWidth
        sx={{ backgroundColor: message?.code === 2 ? 'rgba(245, 132, 132, 0.44)' : null }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography textAlign={'left'} component="h1" variant="h5">
          Item Image:
        </Typography>
        <FileUpload setFileState={setFile} />
      </Box>
      <Button disabled={file ? false : true} type="submit" fullWidth variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default ItemForm;
