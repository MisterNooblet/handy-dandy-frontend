import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import FormInput from 'components/FormInput';
import { FormError, MyObject } from 'utils/models';

const NewCategory = () => {
  const [errorMsg, setErrorMsg] = useState<FormError | MyObject>({} as FormError);
  const [file, setFile] = useState<null | File>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const categoryTitle = data.get('categoryTitle') as string;
    const categoryDescription = data.get('categoryDescription') as string;

    if (categoryDescription.length > 20 && categoryTitle.length > 0) {
      console.log(categoryTitle, categoryDescription);
    } else if (categoryTitle.length === 0) {
      setErrorMsg({ message: 'Please provide a category title', code: 1 });
    } else if (categoryDescription.length < 20) {
      setErrorMsg({ message: 'Please provide a category description 20chars long', code: 2 });
    }
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        {errorMsg.code ? errorMsg.message : 'Submit a new category'}
      </Typography>
      <Box
        onFocus={() => {
          setErrorMsg({});
        }}
        component="form"
        maxWidth={'400px'}
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      >
        <FormInput
          label={'Category Title'}
          name={'categoryTitle'}
          title={'Please provide a category title'}
          fieldIdx={1}
          key={'categoryTitle'}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          type={'text'}
        />
        <TextField
          name="categoryDescription"
          label="Category Description"
          title="Please provide a category description 20chars long"
          multiline
          rows={4}
          fullWidth
          sx={{ backgroundColor: errorMsg.code === 2 ? 'rgba(245, 132, 132, 0.44)' : null }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography textAlign={'left'} component="h1" variant="h5">
            Category Image:
          </Typography>
          <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} />
        </Box>
        <Button disabled={file ? false : true} type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default NewCategory;
