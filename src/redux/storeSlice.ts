import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Social {
  name: string;
  link: string;
}

interface Channel {
  name: string;
  link: string;
}

interface Store {
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
  modal: boolean;
  isClosing: boolean;
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
  modal: false,
  isClosing: false,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modal = !state.modal;
    },
    setIsClosing(state, action: PayloadAction<boolean>) {
      state.isClosing = action.payload;
    },
    updateStore(state, action: PayloadAction<{ index: number; updatedStore: Store }>) {
      const { index, updatedStore } = action.payload;
      state.stores[index] = updatedStore;
    },
  },
});

export const { toggleModal, setIsClosing, updateStore } = storeSlice.actions;
export default storeSlice.reducer;