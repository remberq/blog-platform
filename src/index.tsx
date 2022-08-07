import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.scss';
import '../src/fonts/fonts.scss';
import './normalize.scss';
import 'antd/dist/antd.css';
import MainApp from './components/main-app/main-app';
import { store } from './store/store';

const container = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <MainApp />
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
