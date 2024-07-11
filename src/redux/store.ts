import { configureStore, Store } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import invoiceReducer from "./invoiceSlice";

export const store: Store = configureStore({
  reducer: {
    store: storeReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
