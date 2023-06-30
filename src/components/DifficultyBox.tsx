import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { difficulties } from 'data/constants';

const StyledRating = styled(Rating)({});

export default function DifficultyBox({ difficulty }: { difficulty: number }) {
  return (
    <Box
      title={difficulties[difficulty]}
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        name="customized-color"
        defaultValue={difficulty}
        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={1}
        icon={
          <BuildCircleIcon
            fontSize="inherit"
            sx={{ color: difficulty < 3 ? 'green' : difficulty < 5 ? '#cf7500' : 'red' }}
          />
        }
        emptyIcon={<BuildCircleOutlinedIcon fontSize="inherit" />}
        readOnly
      />
    </Box>
  );
}
