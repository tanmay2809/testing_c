import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../main'
import axios from 'axios'

export interface MostRecommandState {
  data: any | null,
  loading: boolean,
  error: string | null
}

const initialState: MostRecommandState = {
  data: [],
  loading: false,
  error: null
}

export const fetchMostRecommandItemsDetails = createAsyncThunk<any, { id: string }, { rejectValue: any }>(
    'restaurant/fetchMostRecommandItemsDetails',
    async ({ id }, thunkAPI) => {
      try {
        const response = await axios.get(`${baseUrl}/api/mostRecommandMenu/${id}`)
        // console.log(response.data);
        return response.data
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )

export const mostRecommandSlice = createSlice({
  name: 'mostRecommand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMostRecommandItemsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMostRecommandItemsDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMostRecommandItemsDetails.rejected, (state, action: PayloadAction<any>) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      })
  },
})



export default mostRecommandSlice.reducer