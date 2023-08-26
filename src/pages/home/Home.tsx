import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { getTopArticles } from 'utils/apiData';
import { ArticleResponse } from 'utils/models';
import ArticleCard from './components/ArticleCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [topArticles, setTopArticles] = useState<ArticleResponse[]>([]);
  const [latestArticles, setLatestArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getTopArticles();
      setTopArticles(response.top);
      setLatestArticles(response.latest);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <Typography variant='h4' fontWeight={700}>
          You&apos;ve Got A Project In Mind, We Hold The Knowledge!
        </Typography>
        <Typography color={'#CF7500'} variant='h5' fontWeight={700}>
          The information you need is just a click away.
        </Typography>
        <Typography color={'text.secondary'} fontSize={14} fontWeight={700}>
          Wish to write your own article?
          <Link to='/apply/author'>
            {' '}
            <u>Apply for authorship here.</u>
          </Link>
        </Typography>
      </Box>

      <Typography sx={{ textUnderlinePosition: 'under', textDecoration: 'underline' }} color={'text.secondary'} mt={10} textAlign={'center'} variant='h4' fontWeight={700}>
        Community favorites
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
        {topArticles.length > 0 &&
          topArticles.map((article) => {
            return <ArticleCard key={article.title} article={article} />;
          })}
      </Box>
      <Typography sx={{ textUnderlinePosition: 'under', textDecoration: 'underline' }} color={'text.secondary'} mt={10} textAlign={'center'} variant='h4' fontWeight={700}>
        Latest In
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
        {latestArticles.length > 0 &&
          latestArticles.map((article) => {
            return <ArticleCard key={article.title} article={article} />;
          })}
      </Box>
    </>
  );
};

export default Home;
