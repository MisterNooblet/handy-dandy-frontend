import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#212b2d',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#rgba(255, 255, 255, 0.5)',
      paper: '#f1f1f1',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
});
