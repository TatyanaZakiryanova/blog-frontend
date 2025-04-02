import './styles/index.scss';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import theme from './theme.ts';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.Fragment>,
);
