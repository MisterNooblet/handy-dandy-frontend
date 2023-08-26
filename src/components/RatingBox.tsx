import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

type Props = {
  className?: string;
  onChange: (newValue: number) => void;
};

const RatingBoxComponent: React.FunctionComponent<Props> = ({ className, onChange }) => {
  const [value, setValue] = React.useState<number | null>(null);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 }
      }}
      className={className}
    >
      <Typography component='legend'>Rate our conversation?</Typography>
      <Rating
        name='controlled-rating'
        value={value}
        onChange={(event, newValue) => {
          if (newValue === null) {
            return;
          }
          setValue(newValue);
          onChange(newValue as number);
        }}
      />
    </Box>
  );
};

export default RatingBoxComponent;
