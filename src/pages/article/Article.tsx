import { Typography, Card, Box, CardMedia, List, ListItem, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { getArticle } from 'utils/apiData';
import { ArticleResponse, Item } from 'utils/models';
import ArticleHead from './components/ArticleHead';
import ItemPopup from './ItemPopup';

const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [articleDate, setArticleDate] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchArticle = async () => {
      if (params.id) {
        const result: ArticleResponse = await getArticle(params.id);
        const date = new Date(result.updatedAt);
        const options = { month: 'long', day: 'numeric', year: `numeric` } as const;
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(date).toUpperCase();
        setArticleDate(formattedDate);
        setArticle(result);
      }
    };
    fetchArticle();
  }, [params]);
  return (
    <>
      <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {article && (
            <ArticleHead category={article.parentDoc.title} title={article.title} summary={article.summary} />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia component={'img'} src={article?.author.pfp} sx={{ borderRadius: '50px', width: 50 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>{article?.author.fullName} </Typography>{' '}
                <Typography>LAST UPDATED:{articleDate} </Typography>{' '}
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
                <Box component={'img'} src={article?.image} />
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

export default Article;
