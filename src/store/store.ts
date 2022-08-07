import { configureStore } from '@reduxjs/toolkit';

import reducers from './articlesSlice';
const { article, auth } = reducers;

export const store = configureStore({
  reducer: {
    article: article,
    auth: auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
