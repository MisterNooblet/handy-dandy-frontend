import { Box, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { Item } from 'utils/models';

const ItemInfo = ({ item }: { item: Item }) => {
  const { title, description, image, properties } = item;
  return (
    <Box
      p={4}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'start', md: 'center' },
      }}
    >
      <Box textAlign={'center'}>
        <Typography variant="h5">{title}</Typography>
        <Box
          component={'img'}
          sx={{
            background: `url(${image}) center center/contain no-repeat`,
            height: { xs: '100px', md: '300px' },
            width: { xs: '100px', md: '300px' },
          }}
        />
      </Box>
      <Box p={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography mb={2}>{description}</Typography>
        <Typography variant="body2">Item Properties:</Typography>
        <List>
          {properties && properties.map((prop) => (prop.length > 0 ? <ListItem key={prop}>{prop}</ListItem> : null))}
        </List>
      </Box>
    </Box>
  );
};

export default ItemInfo;
