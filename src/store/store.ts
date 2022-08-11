import { configureStore } from '@reduxjs/toolkit';

import reducers from './blog-slices';
const { article, auth, mem } = reducers;

export const store = configureStore({
  reducer: {
    article,
    auth,
    mem,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
