import { Card, List, ListItem, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { ArticleResponse, Item } from 'utils/models';

const RequireList = ({
  article,
  setOpen,
  setCurrentItem,
  setCurrentType,
  setHasItem,
  target,
}: {
  article: ArticleResponse | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
  setCurrentType: React.Dispatch<React.SetStateAction<string>>;
  setHasItem: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
}) => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenPopup = (item: Item, type: string, hasCurrentItem: boolean) => {
    setCurrentItem(item);
    setCurrentType(type);
    setHasItem(hasCurrentItem);
    handleClickOpen();
  };

  const userHasTool = (item: Item) => {
    if (user && item && item.type === 'tool') {
      const userOwns = user.toolbox.tools.find((tool) => tool === item.id);
      return userOwns ? true : false;
    } else if (user && item && item.type === 'material') {
      const userOwns = user.toolbox.materials.find((material) => material === item.id);
      return userOwns ? true : false;
    }
    return false;
  };

  return (
    <Card sx={{ background: '#fff', mb: 4 }}>
      <Typography>{target === 'tools' ? 'Tools' : 'Materials'} Required:</Typography>
      {target === 'tools' ? (
        <List>
          {article?.toolbox.tools.map((item) => {
            return (
              <ListItem
                onClick={() => handleOpenPopup(item, 'material', userHasTool(item))}
                sx={
                  user && {
                    color: userHasTool(item) ? 'green' : 'red',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }
                }
                key={item.title}
              >
                {item.title}
                <InfoIcon />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <List>
          {article?.toolbox.materials.map((item) => {
            return (
              <ListItem
                onClick={() => handleOpenPopup(item, 'material', userHasTool(item))}
                sx={
                  user && {
                    color: userHasTool(item) ? 'green' : 'red',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }
                }
                key={item.title}
              >
                {item.title}
                <InfoIcon />
              </ListItem>
            );
          })}
        </List>
      )}
    </Card>
  );
};

export default RequireList;
