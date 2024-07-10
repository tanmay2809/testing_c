import { configureStore, Store } from '@reduxjs/toolkit';
import storeReducer from './storeSlice';

export const store:Store = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;