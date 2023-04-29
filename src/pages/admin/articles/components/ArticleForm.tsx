/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, TextField, Typography } from '@mui/material';
import FormInput from 'components/FormInput';
import React, { useState } from 'react';
import { ArticleForm as ArticleData, CategorySelect } from 'utils/models';
import FileUpload from 'components/FileUpload';
import HTMLEditor from './HTMLEditor';
import RequirementManager from './RequirementManager';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';
import { createArticle } from 'utils/apiData';

interface TransferListItem {
  id: string;
  title: string;
}

const ArticleForm = ({ target }: { target: CategorySelect }) => {
  const [value, setValue] = useState('**Hello world!!!**');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [neededTools, setNeededTools] = useState<TransferListItem[]>([]);
  const [neededMaterials, setNeededMaterials] = useState<TransferListItem[]>([]);
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const summary = data.get('summary') as string;
    const title = data.get('title') as string;
    const image = file;
    const tools = neededTools.map((tool) => tool.id);
    const materials = neededMaterials.map((material) => material.id);
    if (title?.length > 0 && image && value.length > 0 && user?.id && summary?.length > 0) {
      const payload: ArticleData = {
        title: title,
        image: image,
        articleBody: value,
        author: user?.id,
        toolbox: {
          tools: tools,
          materials: materials,
        },
        summary: summary,
        parentDoc: target.id,
      };

      const response = await createArticle(payload);
      console.log(payload, response);
    }
  };

  return (
    <>
      <Box
        component={'form'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          background: '#f0f0f0f0',
          boxShadow: 4,
          borderRadius: 2,
          padding: 2,
          mt: 2,
          mb: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          <FormInput name={'title'} label={'Article Title'} type="text" title="Article Title" fieldIdx={1} />

          <Box>
            <Typography variant="h6">Article Image</Typography>
            <FileUpload setFileState={setFile} />
          </Box>
        </Box>
        <HTMLEditor setValue={setValue} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around' }}>
          <RequirementManager target="tools" setNeededTools={setNeededTools} setNeededMaterials={setNeededMaterials} />
          <RequirementManager
            target="materials"
            setNeededTools={setNeededTools}
            setNeededMaterials={setNeededMaterials}
          />
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="Article Summary"
          title="Provide a short Summary of the Article"
          multiline
          rows={4}
          placeholder="Provide a short Summary of the Article"
          name="summary"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ArticleForm;
