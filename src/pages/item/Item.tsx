import { Box } from '@mui/material';
import ErrorAPI from 'pages/Error404/ErrorApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from 'utils/apiData';
import { Item as ItemInterface } from 'utils/models';
import ItemCard from './components/ItemCard';

const Item = () => {
  const [item, setItem] = useState<ItemInterface | null>(null);
  const params = useParams();

  useEffect(() => {
    const getTool = async () => {
      if (params.id) {
        try {
          const result = await getItem(params.id);
          setItem(result);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getTool();
  }, [params.id]);

  return <Box sx={{ pt: 8, pb: 8, flexGrow: 1 }}>{item ? <ItemCard item={item} /> : <ErrorAPI />}</Box>;
};

export default Item;
