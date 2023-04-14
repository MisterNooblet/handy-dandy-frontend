import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FormInput from 'components/FormInput';
import { CategoryForm, FormError, MyObject } from 'utils/models';
import { useParams } from 'react-router-dom';
import { createCategory, createSubCategory } from 'utils/apiData';
import SimpleBackdrop from '../../../components/Backdrop';
import CustomizedSnackbar from 'components/AlertSnackbar';

const NewCategory = ({
  categoryTargets,
  docModel,
  selectedCategory,
  fetchDoc,
}: {
  categoryTargets: string[];
  docModel: string | null;
  selectedCategory: string | null;
  fetchDoc: () => void;
}) => {
  const [errorMsg, setErrorMsg] = useState<FormError | MyObject>({} as FormError);
  const [file, setFile] = useState<null | File>(null);
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { id } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const categoryTitle = data.get('categoryTitle') as string;
    const categoryDescription = data.get('categoryDescription') as string;
    if (categoryDescription.length > 20 && categoryTitle.length > 0 && file && id) {
      const newCategory: CategoryForm = {
        title: categoryTitle,
        description: categoryDescription,
        target: selectedTarget,
        docModel: docModel,
        parentDoc: selectedCategory ? selectedCategory : id,
        image: file,
      };
      if (docModel && selectedTarget) {
        try {
          setIsLoading(true);
          const response = await createCategory(newCategory);
          setSuccessMessage(`Category: ${response.title} created successfully with id: ${response.id}`);
          setAlertOpen(true);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setFile(null);
          fetchDoc();
        }
      } else if (!docModel) {
        try {
          setIsLoading(true);
          const response = await createSubCategory(newCategory);
          setSuccessMessage(`SubCategory :${response.title} created successfully with id: ${response.id}`);
          setAlertOpen(true);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setFile(null);
          fetchDoc();
        }
      }
    } else if (!selectedTarget && docModel) {
      setErrorMsg({ message: 'Please select a target', code: 3 });
      setAlertOpen(true);
    } else if (categoryTitle.length === 0) {
      setErrorMsg({ message: 'Please provide a category title', code: 1 });
      setAlertOpen(true);
    } else if (categoryDescription.length < 20) {
      setErrorMsg({ message: 'Please provide a category description atleast 20chars long', code: 2 });
      setAlertOpen(true);
    }
  };
  return (
    <>
      {errorMsg.message && (
        <CustomizedSnackbar open={alertOpen} setOpen={setAlertOpen} message={errorMsg.message} severity="error" />
      )}
      {successMessage && (
        <CustomizedSnackbar open={alertOpen} setOpen={setAlertOpen} message={successMessage} severity="success" />
      )}
      <SimpleBackdrop open={isLoading} />
      <Typography mt={2} component="h1" variant="h5">
        {errorMsg.code ? errorMsg.message : `${docModel ? 'Create Category to:' : 'Create SubCategory'}`}
      </Typography>
      <Box
        onFocus={() => {
          setErrorMsg({});
        }}
        component="form"
        maxWidth={'400px'}
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}
      >
        {docModel && (
          <FormControl fullWidth>
            <InputLabel id="target">Target :</InputLabel>
            <Select
              labelId="target"
              id="demo-simple-select"
              value={selectedTarget}
              label="target"
              sx={{ backgroundColor: errorMsg.code === 3 ? 'rgba(245, 132, 132, 0.44)' : null }}
              onChange={(event) => setSelectedTarget(event.target.value as string)}
            >
              <MenuItem value={''}>Select Target</MenuItem>
              {categoryTargets.map((target) => (
                <MenuItem key={target} value={target}>
                  {target}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
