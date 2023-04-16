import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FormInput from 'components/FormInput';
import { CategoryForm } from 'utils/models';
import { useParams } from 'react-router-dom';
import { createCategory, createSubCategory } from 'utils/apiData';
import SimpleBackdrop from '../../../components/Backdrop';
import FileUpload from 'components/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setMessage, UiState } from 'store/uiSlice';

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
  const [file, setFile] = useState<File | undefined>(undefined);
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.ui) as UiState;

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
          dispatch(
            setMessage({
              message: `Category :${response.title} created successfully with id: ${response.id}`,
              severity: 'success',
            })
          );
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setFile(undefined);
          fetchDoc();
        }
      } else if (!docModel) {
        try {
          setIsLoading(true);
          const response = await createSubCategory(newCategory);
          dispatch(
            setMessage({
              message: `SubCategory :${response.title} created successfully with id: ${response.id}`,
              severity: 'success',
            })
          );
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setFile(undefined);
          fetchDoc();
        }
      }
    } else if (!selectedTarget && docModel) {
      dispatch(setMessage({ message: 'Please select a target', code: 3, severity: 'error' }));
    } else if (categoryTitle.length === 0) {
      dispatch(setMessage({ message: 'Please provide a category title', code: 1, severity: 'error' }));
    } else if (categoryDescription.length < 20) {
      dispatch(
        setMessage({
          message: 'Please provide a category description atleast 20chars long',
          code: 2,
          severity: 'error',
        })
      );
    }
  };
  return (
    <>
      <SimpleBackdrop open={isLoading} />
      <Typography mt={2} component="h1" variant="h5">
        {message?.code ? message.message : `${docModel ? 'Create Category to:' : 'Create SubCategory'}`}
      </Typography>
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
        {docModel && (
          <FormControl fullWidth>
            <InputLabel id="target">Target :</InputLabel>
            <Select
              labelId="target"
              id="demo-simple-select"
              value={selectedTarget}
              label="target"
              sx={{ backgroundColor: message?.code === 3 ? 'rgba(245, 132, 132, 0.44)' : null }}
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
          type={'text'}
        />
        <TextField
          name="categoryDescription"
          label="Category Description"
          title="Please provide a category description 20chars long"
          multiline
          rows={4}
          fullWidth
          sx={{ backgroundColor: message?.code === 2 ? 'rgba(245, 132, 132, 0.44)' : null }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography textAlign={'left'} component="h1" variant="h5">
            Category Image:
          </Typography>
          <FileUpload setFileState={setFile} />
        </Box>
        <Button disabled={file ? false : true} type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default NewCategory;
