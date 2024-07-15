import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../main'
import axios from 'axios'

export interface RestaurantState {
  data: any | null,
  loading: boolean,
  error: string | null
}

const initialState: RestaurantState = {
  data: [],
  loading: false,
  error: null
}

export const fetchRestaurantDetails = createAsyncThunk<any, { id: string }, { rejectValue: any }>(
    'restaurant/fetchRestaurantDetails',
    async ({ id }, thunkAPI) => {
      try {
        const response = await axios.get(`${baseUrl}/api/details/${id}`)
        // console.log(response.data)
        return response.data
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRestaurantDetails.rejected, (state, action: PayloadAction<any>) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      })
  },
})



export default restaurantSlice.reducer