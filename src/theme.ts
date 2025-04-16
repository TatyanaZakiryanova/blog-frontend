import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#fbfbfb',
    },
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#009688',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
