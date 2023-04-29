import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  List,
  Button,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';
import { Item, UserExtended } from 'utils/models';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'utils/apiAuth';
import { setToolBox } from 'store/authSlice';

const ItemList = ({
  user,
  setMoreInfo,
}: {
  user: UserExtended | null;
  setMoreInfo: React.Dispatch<React.SetStateAction<Item | null>>;
}) => {
  const [listHeight, setListHeight] = useState('80%');
  const [checked, setChecked] = useState<(string | number)[]>([0]);
  const dispatch = useDispatch();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleUpdateToolbox = async () => {
    if (user) {
      let newToolBox = null;

      const newTools = user.toolbox.tools.reduce((acc: string[], item) => {
        if (!checked.includes(item.title)) {
          acc.push(item.id);
        }
        return acc;
      }, []);

      const newMaterials = user.toolbox.materials.reduce((acc: string[], item) => {
        if (!checked.includes(item.title)) {
          acc.push(item.id);
        }
        return acc;
      }, []);
      newToolBox = { tools: newTools, materials: newMaterials };
      const response = await updateUserData({ toolbox: newToolBox });
      dispatch(setToolBox(response.toolbox));
      setChecked([0]);
    }
  };

  return (
    <Box component={'div'} sx={{ height: { xs: listHeight, md: '80vh' } }}>
      <List
        className="custom_scroller"
        sx={{
          width: { xs: '100%', md: '360px' },
          height: '100%',
          overflowY: 'scroll',
          bgcolor: 'backgroud.paper',
        }}
      >
        {user?.toolbox.tools.map((value, idx) => {
          const labelId = `checkbox-list-label-${value.title}`;

          return (
            <ListItem
              key={value.title}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    setMoreInfo(user?.toolbox.tools[idx]);
                    setListHeight('40%');
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value.title)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value.title) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.title}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
        {user?.toolbox.materials.map((value, idx) => {
          const labelId = `checkbox-list-label-${value.title}`;

          return (
            <ListItem
              key={value.title}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    setMoreInfo(user?.toolbox.materials[idx]);
                    setListHeight('40%');
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value.title)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value.title) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.title}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button onClick={handleUpdateToolbox} disabled={checked.length > 1 ? false : true}>
        REMOVE checked items from Toolbox
      </Button>
    </Box>
  );
};

export default ItemList;
