import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, useMediaQuery, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState, setToolBox } from 'store/authSlice';
import { Item as ItemModule } from 'utils/models';
import { updateUserData } from 'utils/apiAuth';
import { advancedRequest } from 'utils/apiData';

const paths = {
  tools: 'wiki/tools/c/',
  materials: 'wiki/materials/c/',
};

interface UrlTree {
  category: string;
  subcategory: string;
  item: string;
}

export default function ResponsiveDialog({
  setOpen,
  open,
  item,
  type,
  hasItem,
  setHasItem,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  item: ItemModule;
  type: string;
  hasItem: boolean;
  setHasItem: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [urlTree, setUrlTree] = useState<UrlTree>({} as UrlTree);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getCategory = async () => {
      const response = await advancedRequest(`items/hierarchy/${item.id}`);
      setUrlTree(response);
    };
    getCategory();
  }, [item.id, item.parentDoc]);
  const addNewItemToToolbox = async () => {
    if (user && item) {
      //redux has a setting where it freezes the state, so we need to make a copy of it
      const newToolBox = JSON.parse(JSON.stringify(user.toolbox));
      if (item.type === 'tool') {
        newToolBox.tools.push(item.id);
      } else if (item.type === 'material') {
        newToolBox.materials.push(item.id);
      }
      const response = await updateUserData({ toolbox: newToolBox });
      dispatch(setToolBox(response.toolbox));
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ background: 'rgba(255, 255, 255, 0.5)' }}
      >
        <DialogTitle id="responsive-dialog-title">{item && item.title}</DialogTitle>
        <DialogContent>
          <>
            <List>
              {item && item.properties.map((prop) => prop.length > 0 && <ListItem key={prop}>{prop}</ListItem>)}
            </List>
          </>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Link
            to={
              type &&
              urlTree.category &&
              `${type === 'tool' ? `/${paths.tools}` : `/${paths.materials}`}${urlTree.category}/items/${
                urlTree.subcategory
              }/item/${item.id}`
            }
            target="_blank"
          >
            <Button
              onClick={() => {
                handleClose();
              }}
              autoFocus
            >
              Read more in Tool-O-Pedia
            </Button>
          </Link>
          {user && (
            <Button
              onClick={() => {
                setHasItem((prev) => (prev = !prev));
                addNewItemToToolbox();
              }}
              autoFocus
              disabled={hasItem && true}
            >
              {hasItem ? 'In toolbox' : 'Add to toolbox'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
