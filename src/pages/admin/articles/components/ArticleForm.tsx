/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button } from '@mui/material';
import FormInput from 'components/FormInput';
import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import FileUpload from 'components/FileUpload';
import HTMLEditor from './HTMLEditor';

const ArticleForm = ({ target }: { target: CategorySelect }) => {
  const [value, setValue] = useState('**Hello world!!!**');
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      title: data.get('title'),
      description: value,
    };
    console.log(payload);
    // handle form submission here
  };

  return (
    <>
      <Box component={'form'} sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <FormInput name={'title'} label={'Title'} type="text" title="Article Title" fieldIdx={1} />
        <FileUpload setFileState={setFile} />
        <HTMLEditor setValue={setValue} />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ArticleForm;
