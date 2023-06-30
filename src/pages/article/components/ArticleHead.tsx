import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DifficultyBox from 'components/DifficultyBox';
import { difficulties } from 'data/constants';
import React from 'react';

const ArticleHead = ({
  category,
  title,
  summary,
  difficulty,
}: {
  category: string;
  title: string;
  summary: string;
  difficulty: number;
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="h5" letterSpacing={4}>
          {category}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight={700}>
        {title}
      </Typography>
      Difficulty : {difficulties[difficulty]}
      <DifficultyBox difficulty={difficulty} />
      <Typography variant="h6" fontWeight={200}>
        {summary}
      </Typography>
    </Box>
  );
};

export default ArticleHead;
