import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 1)'
        }
      }
    }
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#1A1C20'
    },
    secondary: {
      main: '#F0A500'
    },
    background: {
      default: '#F4F4F4',
      paper: '#f1f1f1'
    },
    text: {
      primary: '#000',
      secondary: '#666666'
    }
  }
});
