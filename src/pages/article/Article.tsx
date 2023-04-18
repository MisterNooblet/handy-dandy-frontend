import { Typography, Card, Box, CardMedia, List, ListItem, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthState, updateUser } from 'store/authSlice';
import { RootState } from 'store/store';
import { getArticle, setUpvotes } from 'utils/apiData';
import { ArticleResponse, Item } from 'utils/models';
import ArticleHead from './components/ArticleHead';
import ItemPopup from './ItemPopup';
import { FcLike } from 'react-icons/fc';
import { AiFillStar } from 'react-icons/ai';
import { updateUserData } from 'utils/apiAuth';
import formatDate from 'utils/formatDate';

const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [articleDate, setArticleDate] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentType, setCurrentType] = useState('');
  const [hasItem, setHasItem] = useState<boolean>(false);
  const [faved, setFaved] = useState<boolean>(false);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const handleEngage = async (type: string) => {
    if (type === 'favourite') {
      if (faved && user) {
        const newFavs = user.favourites.filter((fav) => fav !== article?.id);
        const updatedUser = await updateUserData({ favourites: newFavs });
        dispatch(updateUser(updatedUser));
      } else if (!faved && user && article) {
        const newFavs = [...user.favourites, article.id];
        const updatedUser = await updateUserData({ favourites: newFavs });
        dispatch(updateUser(updatedUser));
      }
      setFaved(!faved);
    } else if (type === 'upvote') {
      if (upvoted && user && article) {
        const newUpvotes = article.upvotes.filter((upvote) => upvote !== user.id);
        try {
          await setUpvotes({ userId: user.id, articleId: article.id });
          setArticle({ ...article, upvotes: newUpvotes });
          setUpvoted(!upvoted);
        } catch (error) {
          console.log(error);
        }
      } else if (!upvoted && user && article) {
        const newUpvotes = [...article.upvotes, user.id];
        try {
          await setUpvotes({ userId: user.id, articleId: article.id });
          setArticle({ ...article, upvotes: newUpvotes });
          setUpvoted(!upvoted);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    const fetchArticle = async () => {
      if (params.id) {
        const result: ArticleResponse = await getArticle(params.id);
        const date = formatDate(result.updatedAt);
        setArticleDate(date);
        setArticle(result);
      }
    };
    const checkFavs = () => {
      if (user && article) {
        const fav = user.favourites.find((fav) => fav === article.id);
        if (fav) {
          setFaved(true);
        }
        const upvoted = article.upvotes.find((upvote) => upvote === user.id);
        if (upvoted) {
          setUpvoted(true);
        }
      }
    };
    if (!article) {
      fetchArticle();
    }
    checkFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, user]);
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
        <Box
          onClick={() => {
            handleEngage('upvote');
          }}
          title="Upvote"
          sx={{
            transition: 'all ease-in-out 0.5s',
            opacity: !upvoted ? '0.5' : '1',
            position: 'relative',
            ':after': {
              content: `"${article?.upvotes.length}"`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            },
          }}
        >
          <FcLike fontSize={'40px'} cursor="pointer" />
        </Box>
        <Box
          title="Add to favourites"
          sx={{ transition: 'all ease-in-out 0.5s', color: !faved ? 'grey' : 'secondary.main' }}
        >
          <AiFillStar
            fontSize={'40px'}
            cursor="pointer"
            onClick={() => {
              handleEngage('favourite');
            }}
          />
        </Box>
      </Box>
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
                <Typography sx={{ fontSize: 14, color: '#cf7500' }}>LAST UPDATED: {articleDate} </Typography>{' '}
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
