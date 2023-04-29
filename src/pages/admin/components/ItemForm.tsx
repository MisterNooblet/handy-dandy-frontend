import { Button, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import FileUpload from 'components/FileUpload';
import FormInput from 'components/FormInput';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setMessage, UiState } from 'store/uiSlice';
import { CategorySelect } from 'utils/models';
import { ImCross } from 'react-icons/im';
import { createItem } from 'utils/apiData';

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
  const [prop, setProp] = useState<string>('');
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.ui) as UiState;

  const handleAddProp = () => {
    if (prop.length > 0) {
      setProperties([...properties, prop]);
      setProp('');
    }
  };

  const handleRemoveProp = (propValue: string) => {
    const newProps = properties.filter((value) => value !== propValue);
    setProperties(newProps);
  };

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
      try {
        console.log(newItem);
        const response = await createItem(newItem);
        dispatch(
          setMessage({
            message: `${response.type}: ${response.title} with id of ${response.id} was created successfuly`,
            severity: 'success',
          })
        );
      } catch (error) {
        dispatch(
          setMessage({
            message: `Something went wrong on the backend while adding the item , please try again later :(`,
            severity: 'error',
          })
        );
      }
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
    } else if (properties.length === 0) {
      dispatch(
        setMessage({
          message: 'Please provide atleast one item property',
          code: 3,
          severity: 'error',
        })
      );
    }
  };
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
      <Box sx={{ display: 'flex' }}>
        <TextField
          type={'text'}
          name="itemProperties"
          label="Item Properties"
          title="Add item properties"
          value={prop}
          sx={{ backgroundColor: message?.code === 3 ? 'rgba(245, 132, 132, 0.44)' : null }}
          onChange={(e) => setProp(e.target.value)}
        />
        <Button type="button" variant="contained" onClick={handleAddProp}>
          Add
        </Button>
      </Box>
      <Typography textAlign={'left'} component="h1" variant="h5">
        Item Properties:
      </Typography>
      <List>
        {properties.map((property, idx) => (
          <ListItem key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {property}{' '}
            <Button type="button" onClick={() => handleRemoveProp(property)}>
              <ImCross />
            </Button>{' '}
          </ListItem>
        ))}
      </List>
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
