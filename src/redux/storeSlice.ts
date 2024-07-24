import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Social {
//   name: string;
//   link: string;
// }

// interface Channel {
//   name: string;
//   link: string;
// }

export interface Store {
  name: string;
  email: string;
  type: string;
  landmark: string;
  city: string;
  state: string;
  pincode: number;
  // socials: Social[];
  // channels: Channel[];
  manager: string;
  contact: string;
  instagram: string;
  facebook: string;
  youtube: string;
  google: string;
  zomato: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    updateStore(
      state,
      action: PayloadAction<{ index: number; updatedStore: Store }>
    ) {
      const { index, updatedStore } = action.payload;
      state.stores[index] = updatedStore;
    },
    setStoreFromRestaurant(
      state,
      action: PayloadAction<{ index: number; restaurantData: any }>
    ) {
      const { index, restaurantData } = action.payload;
      const updatedStore: Store = {
        name: restaurantData.resName,
        email: restaurantData.email,
        type: restaurantData.businessType,
        landmark: restaurantData.landmark,
        city: restaurantData.city,
        state: restaurantData.state,
        pincode: restaurantData.pincode,
        // socials: restaurantData.socials,
        // channels: restaurantData.channels,
        manager: restaurantData.manager,
        contact: restaurantData.contact,
        instagram: restaurantData.instagram,
        facebook: restaurantData.facebook,
        youtube: restaurantData.youtube,
        google: restaurantData.google,
        zomato: restaurantData.zomato,
      };
      state.stores[index] = updatedStore;
    },
  },
});

export const { updateStore, setStoreFromRestaurant } = storeSlice.actions;
export default storeSlice.reducer;
