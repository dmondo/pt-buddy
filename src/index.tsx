import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { StoreProvider } from './store/store';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('watchdog'),
);
