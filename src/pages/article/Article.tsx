import { Typography, Card, Box, CardMedia, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from 'utils/apiData';
import { ArticleResponse, Item } from 'utils/models';
import ArticleHead from './components/ArticleHead';
import ItemPopup from './ItemPopup';
import formatDate from 'utils/formatDate';
import RequireList from './components/RequireList';
import EngageBox from './components/EngageBox';

const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [articleDate, setArticleDate] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentType, setCurrentType] = useState('');
  const [hasItem, setHasItem] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (params.id) {
        const result: ArticleResponse = await getArticle(params.id);
        const date = formatDate(result.updatedAt);
        setArticleDate(date);
        setArticle(result);
      }
    };

    if (!article) {
      fetchArticle();
    }
  }, [params.id, article]);

  return (
    <>
      <EngageBox article={article} setArticle={setArticle} />
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
                {article && (
                  <RequireList
                    setCurrentItem={setCurrentItem}
                    setCurrentType={setCurrentType}
                    setHasItem={setHasItem}
                    setOpen={setOpen}
                    article={article}
                    target={'materials'}
                  />
                )}
                {article && (
                  <RequireList
                    setCurrentItem={setCurrentItem}
                    setCurrentType={setCurrentType}
                    setHasItem={setHasItem}
                    setOpen={setOpen}
                    article={article}
                    target={'tools'}
                  />
                )}
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
