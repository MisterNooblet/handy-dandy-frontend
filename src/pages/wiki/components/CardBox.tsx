import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React, { useEffect, useState } from 'react';
import { Link, Params, useNavigate } from 'react-router-dom';
import { getCategories, getItems, getSubCategories } from 'utils/apiData';
import DefaultCards from './DefaultCards';
export interface CardProps {
  title: string;
  description: string;
  image: string;
  id?: string;
}
const CardBox = ({ params, array }: { params?: Readonly<Params<string>>; array?: CardProps[] }) => {
  const [results, setResults] = useState<CardProps[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async (location: string) => {
    const result = await getCategories(location);
    setResults(result);
    console.log(result);
  };

  const getItemSubCategories = async (parentDoc: string) => {
    const result = await getSubCategories(parentDoc);
    setResults(result);
  };

  const fetchItems = async (parentDoc: string) => {
    const result = await getItems(parentDoc);
    setResults(result);
  };

  useEffect(() => {
    setResults([]);
    console.log(params);
    if (params && params.type && !params.category) {
      fetchCategories(params.type);
    } else if (params && params.type && params.category && !params.subCategory) {
      getItemSubCategories(params.category);
    } else if (params && params.type && params.category && params.subCategory) {
      fetchItems(params.subCategory);
    }
  }, [params]);

  return (
    <>
      {params === undefined && array ? <DefaultCards array={array} /> : null}

      {params && results.length === 0 && (
        <Box>
          <Typography component={'h3'} variant={'h3'}>
            No data yet..
          </Typography>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back?
          </Button>
        </Box>
      )}
      {results.map((card) => (
        <Grid item key={Math.random()} xs={12} sm={6} md={4} m={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="div"
              sx={{
                background: `url('${card.image}')  center/cover no-repeat`,
                objectFit: 'scale-down',
                width: '100%',
                height: '125px',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.description}</Typography>
            </CardContent>
            <CardActions>
              <Link
                to={
                  !params?.subcategory && !params?.category
                    ? `c/${card.id}`
                    : params?.category && !params.subCategory
                    ? `items/${card.id}`
                    : `item/${card.id}`
                }
              >
                <Button size="small">View</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default CardBox;
