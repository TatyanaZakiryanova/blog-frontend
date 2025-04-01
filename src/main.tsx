import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';

import App from './App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import theme from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
