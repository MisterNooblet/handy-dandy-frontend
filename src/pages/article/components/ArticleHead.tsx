import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const ArticleHead = ({ category, title, summary }: { category: string; title: string; summary: string }) => {
  return (
    <Box>
      <Typography variant="h5" letterSpacing={4}>
        {category}
      </Typography>
      <Typography variant="h3" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={200}>
        {summary}
      </Typography>
    </Box>
  );
};

export default ArticleHead;
