import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InfoIcon from '@mui/icons-material/Info';
import ItemInfo from './components/ItemInfo';
import { Box } from '@mui/system';
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AuthState, setToolBox } from '../../store/authSlice';
import { RootState } from 'store/store';
import { fetchUserExtended, updateUserData } from 'utils/apiAuth';
import { Item, UserExtended } from 'utils/models';

const Toolbox = () => {
  const [moreInfo, setMoreInfo] = useState<Item | null>(null);
  const [listHeight, setListHeight] = useState('80%');
  const [checked, setChecked] = React.useState<(string | number)[]>([0]);
  const [user, setUser] = useState<UserExtended | null>(null);
  const { user: authUser } = useSelector((state: RootState) => state.auth) as AuthState;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserExtended();
      setUser(response);
      console.log(response);
    };
    if (authUser) {
      fetchUser();
    }
  }, [authUser]);
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
    console.log(checked);
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
    <Box sx={{ pt: 6, pb: 6, flexGrow: 1 }}>
      {!user && <div>Please login to use this feature.</div>}

      {user && user?.toolbox.tools.length === 0 && user.toolbox.materials.length === 0 ? (
        <div>Toolbox empty</div>
      ) : user ? (
        <Box component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
          <Box component={'div'} sx={{ height: { xs: listHeight, md: '80vh' } }}>
            <List
              className="custom_scroller"
              sx={{
                width: { xs: '100%', md: '360px' },
                height: '100%',
                overflowY: 'scroll',
                bgcolor: 'background.paper',
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
          {moreInfo && <ItemInfo item={moreInfo} />}
        </Box>
      ) : null}
    </Box>
  );
};

export default Toolbox;
