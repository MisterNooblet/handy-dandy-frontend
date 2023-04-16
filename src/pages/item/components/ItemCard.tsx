import { Button, Card, CardMedia, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthState, setToolBox } from 'store/authSlice';
import { RootState } from 'store/store';
import { updateUserData } from 'utils/apiAuth';
import { Item } from 'utils/models';

const ItemCard = ({ item }: { item: Item }) => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const [userHasTool, setUserHasTool] = useState<undefined | string>(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addNewItemToToolbox = async () => {
    if (user) {
      //redux has a setting where it freezes the state, so we need to make a copy of it
      const currentToolbox = JSON.parse(JSON.stringify(user.toolbox));

      if (item.type === 'tool') {
        currentToolbox.tools.push(item.id);
      } else if (item.type === 'material') {
        currentToolbox.materials.push(item.id);
      }
      try {
        const response = await updateUserData({ toolbox: currentToolbox });
        dispatch(setToolBox(response.toolbox));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      let userOwns;
      if (item.type === 'tool') {
        userOwns = user.toolbox.tools.find((tool) => tool === item.id);
      } else if (item.type === 'material') {
        userOwns = user.toolbox.materials.find((material) => material === item.id);
      }
      userOwns && setUserHasTool(userOwns);
    }
  }, [user, item.title, item.type, item.id]);

  return (
    <Card sx={{ maxHeight: '100%', display: 'flex' }}>
      <Box p={4} sx={{ display: 'flex' }}>
        <CardMedia sx={{ maxHeight: '50vh', objectFit: 'contain' }} component={'img'} image={item.image} />
      </Box>
      <Box p={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography textAlign={'center'} variant="h2" component={'h1'}>
          {item.title}
        </Typography>
        <Typography>{item.description}</Typography>
        <List>
          {item.properties.length > 0 &&
            item.properties.map(
              (prop) =>
                prop && (
                  <ListItem key={prop}>
                    <Typography>{prop}</Typography>
                  </ListItem>
                )
            )}
        </List>
        <Box>
          {user && !userHasTool && (
            <Button sx={{ width: 'fit-content' }} onClick={addNewItemToToolbox}>
              Add to my Toolbox
            </Button>
          )}
          {user && userHasTool && (
            <Button sx={{ width: 'fit-content' }} onClick={() => navigate('/toolbox')}>
              You own this tool! to toolbox?
            </Button>
          )}
          <Button sx={{ width: 'fit-content' }} onClick={() => navigate(-1)}>
            Back to Category
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ItemCard;
