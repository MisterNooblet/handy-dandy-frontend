import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { advancedRequest } from 'utils/apiData';
import { ArticleResponse } from 'utils/models';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import ArticleCard from 'pages/home/components/ArticleCard';
const Favorites = () => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const [articles, setArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await advancedRequest('auth/current-user-favorites');
        setArticles(response.favourites);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchArticles();
    }
  }, [user]);
  return (
    <>
      <Typography sx={{ textUnderlinePosition: 'under', textDecoration: 'underline' }} color={'text.secondary'} mt={10} textAlign={'center'} variant='h4' fontWeight={700}>
        Your favorites
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' },
          rowGap: 4,
          columnGap: 10,
          mt: 10
        }}
      >
        {articles.length > 0 &&
          articles.map((article) => {
            return <ArticleCard key={article.title} article={article} />;
          })}
      </Box>
    </>
  );
};

export default Favorites;
