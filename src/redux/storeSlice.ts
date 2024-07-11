import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Social {
  name: string;
  link: string;
}

interface Channel {
  name: string;
  link: string;
}

export interface Store {
  username: string;
  email: string;
  type: string;
  landmark: string;
  city: string;
  state: string;
  pincode: number;
  socials: Social[];
  channels: Channel[];
  manager: string;
  contact: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [
    {
      username: "Foodoos",
      email: "connect.foodoos@gmail.com",
      type: "Cafeteria",
      landmark: "Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      pincode: 700059,
      socials: [
        { name: "youtube", link: "" },
        { name: "facebook", link: "" },
        { name: "instagram", link: "" },
      ],
      channels: [
        { name: "zomato", link: "" },
        { name: "google", link: "" },
      ],
      manager: "Sam Sundar",
      contact: "+91 7021457893",
    },
  ],
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
  },
});

export const { updateStore } = storeSlice.actions;
export default storeSlice.reducer;
