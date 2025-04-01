import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5',
    },
    secondary: {
      main: '#E53935',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
