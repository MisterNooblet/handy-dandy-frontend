import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Stack } from '@mui/system';
import { Params, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardBox from './components/CardBox';
import { normalizeCC } from 'utils/normalizeCamelCase';

const cards = [
  {
    title: 'Tools',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image: 'https://www.letsbuild.com/wp-content/uploads/2017/06/tools-864983_1280.jpg',
  },
  {
    title: 'Materials',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image: 'https://www.structuralguide.com/wp-content/uploads/2022/01/Construction-Materials.jpg',
  },
];

const introString =
  'Here you will find information about diffrent tools and materials mentioned around in our application and articles. So go ahead and select a category below , to start exploring.';

export default function Wiki() {
  const params: Readonly<Params<string>> = useParams();
  return (
    <>
      <CssBaseline />
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
            {!params.category
              ? 'Our Tool-O-Pedia'
              : params.type
              ? normalizeCC(params.type)
              : params.subcategories
              ? normalizeCC(params.subcategories)
              : params.category
              ? normalizeCC(params.category)
              : 'Something went wrong'}
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {!params.category && introString}
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