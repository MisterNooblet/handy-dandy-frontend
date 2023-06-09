import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React, { useEffect, useState } from 'react';
import { Link, Params, useNavigate } from 'react-router-dom';
import { getArticles, getCategories, getItems, getSubCategories } from 'utils/apiData';
import DefaultCards from './DefaultCards';
export interface CardProps {
  title: string;
  description: string;
  image: string;
  id?: string;
}
const CardBox = ({ params, array }: { params?: Readonly<Params<string>>; array?: CardProps[] }) => {
  const [results, setResults] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchCategories = async (location: string) => {
    const result = await getCategories(location);
    setResults(result);
  };

  const getItemSubCategories = async (parentDoc: string) => {
    const result = await getSubCategories(parentDoc);
    setResults(result);
  };

  useEffect(() => {
    setIsLoading(true);
    setResults([]);
    const fetchItems = async (parentDoc: string) => {
      if (params?.type === 'articles') {
        const result = await getArticles(parentDoc);
        setResults(result);
      } else {
        const result = await getItems(parentDoc);
        setResults(result);
      }
    };

    const fetchCats = async () => {
      if (params && params.type && !params.category) {
        await fetchCategories(params.type);
      } else if (params && params.type && params.category && !params.subCategory) {
        await getItemSubCategories(params.category);
      } else if (params && params.type && params.category && params.subCategory) {
        await fetchItems(params.subCategory);
      }
      setIsLoading(false);
    };
    fetchCats();
  }, [params]);

  return (
    <>
      {params === undefined && array ? <DefaultCards array={array} /> : null}

      {params && results.length === 0 && !isLoading && (
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
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
              <Typography sx={{ maxHeight: '150px' }}>
                {card.description && card.description.substring(0, 150) + '...'}
              </Typography>
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
