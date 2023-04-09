import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#212b2d',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#5586a6',
      paper: '#9DC08B',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  },
});
