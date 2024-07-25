import { configureStore, Store } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import restaurantSlice from "./restaurantData";

export const store: Store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    resturantdata: restaurantSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
