import { configureStore, Store } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import restaurantSlice from "./restaurantData";
import  mostRecommandSlice  from "./mostrecommandslice";


export const store: Store = configureStore({
  reducer: {
   'invoice': invoiceReducer,
   'resturantdata': restaurantSlice,
   'mostRecommand': mostRecommandSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
