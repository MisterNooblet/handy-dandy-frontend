import React, { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@mui/system';
import { Params, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardBox from './components/CardBox';
import { advancedRequest } from 'utils/apiData';

const cards = [
  {
    title: 'Tools',
    description: 'All the tools you need to get started with your project.',
    image: 'https://www.letsbuild.com/wp-content/uploads/2017/06/tools-864983_1280.jpg',
  },
  {
    title: 'Materials',
    description: 'All the materials you need to get started with your project.',
    image: 'https://www.structuralguide.com/wp-content/uploads/2022/01/Construction-Materials.jpg',
  },
];

const introString =
  'Here you will find information about diffrent tools and materials mentioned around in our application and articles. So go ahead and select a category below , to start exploring.';

interface PageTitleProps {
  title: string;
  description: string;
}

export default function Wiki() {
  const params: Readonly<Params<string>> = useParams();
  const [results, setResults] = useState<PageTitleProps | null>(null);
  useEffect(() => {
    const getData = async () => {
      if (params.type === 'tools' && !params.category && !params.subCategory) {
        setResults({ title: 'Tools', description: 'All the tools you need to get started with your project.' });
      } else if (params.type === 'materials' && !params.category && !params.subCategory) {
        setResults({ title: 'Materials', description: 'All the materials you need to get started with your project.' });
      } else if (params.type === 'articles' && !params.category && !params.subCategory) {
        setResults({ title: 'Articles', description: 'Our collection of articles to help you with your DIY Projects' });
      } else if (params.category && !params.subCategory) {
        try {
          const result = await advancedRequest(`categories/${params.category}`);
          console.log(result);
          setResults(result);
        } catch (error) {
          setResults(null);
        }
      } else if (params.subCategory) {
        try {
          const result = await advancedRequest(`subcategories/${params.subCategory}`);
          setResults(result);
        } catch (error) {
          setResults(null);
        }
      } else {
        setResults(null);
      }
    };
    getData();
  }, [params]);
  return (
    <>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
          flexGrow: 1,
        }}
      >
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
            {!results ? 'Our Tool-O-Pedia' : results.title}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {!results ? introString : results.description}
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            {/* <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {!params.type && <CardBox array={cards} />}
          {params.type && <CardBox params={params} />}
        </Grid>
      </Container>
    </>
  );
}
