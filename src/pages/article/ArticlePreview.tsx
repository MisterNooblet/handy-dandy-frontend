import { Typography, Card, Box, CardMedia, List, ListItem, Container } from '@mui/material';
import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { ArticlePreview as ArticlePreviewType, Item } from 'utils/models';
import ArticleHead from './components/ArticleHead';
import ItemPopup from './ItemPopup';
import CloseIcon from '@mui/icons-material/Close';

const ArticlePreview = ({
  article,
  handleClose,
}: {
  article: ArticlePreviewType;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentType, setCurrentType] = useState('');
  const [hasItem, setHasItem] = useState<boolean>(false);

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
    <>
      <Box
        sx={{
          position: 'sticky',
          top: '0',
          bottom: { lg: '', xs: '0' },
          display: 'flex',
          justifyContent: 'right',
          zIndex: '5',
        }}
      >
        <Box title="Close Preview" onClick={() => handleClose(false)}>
          <CloseIcon sx={{ fontSize: '40px' }} cursor="pointer" />
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {article && (
            <ArticleHead
              category={article.parentDoc.title}
              title={article.title}
              summary={article.summary}
              difficulty={article.difficulty}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                rel="preload"
                component={'img'}
                src={user?.pfp}
                alt={user?.fullName}
                sx={{ borderRadius: '50px', width: 50 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>{user?.fullName} </Typography>{' '}
                <Typography sx={{ fontSize: 14, color: '#cf7500' }}>
                  LAST UPDATED: {new Date().toDateString()}{' '}
                </Typography>{' '}
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                rowGap: 1,
                columnGap: 4,
              }}
            >
              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <Box rel="preload" alt={article?.image} component={'img'} src={article?.image} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  width: { xs: '100%', md: 'auto' },
                  height: 'fit-content',
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                }}
              >
                {article?.toolbox.materials.length ? (
                  <Card sx={{ background: '#fff', mb: 4 }}>
                    <Typography>Materials Required:</Typography>
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
                  </Card>
                ) : null}
                {article?.toolbox.tools.length ? (
                  <Card sx={{ background: '#fff', mb: 4 }}>
                    <Typography>Tools Required:</Typography>
                    <List>
                      {article?.toolbox.tools.map((item) => {
                        return (
                          <ListItem
                            onClick={() => handleOpenPopup(item, 'tool', userHasTool(item))}
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
                  </Card>
                ) : null}
              </Box>
            </Box>
          </Box>
          {article && <Box component={'div'} dangerouslySetInnerHTML={{ __html: article.articleBody }} />}
        </Box>
      </Container>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <Card sx={{ bgcolor: 'background.default' }}>
          {currentItem && (
            <ItemPopup
              open={open}
              setOpen={setOpen}
              item={currentItem}
              type={currentType}
              hasItem={hasItem}
              setHasItem={setHasItem}
            />
          )}
        </Card>
      </Box>
    </>
  );
};

export default ArticlePreview;
