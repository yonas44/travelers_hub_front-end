import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import addPackage from './Packages/addPackage';

const initialState = {
  sucess: false,
  loading: false,
  flightpackage: [],
  message: '',
  error: '',
};

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => axios
    .get('http://127.0.0.1:3000/packages')
    .then((response) => response.data),
);

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  extraReducers: (builder) => {
    // eslint-disable-next-line
    builder.addCase(fetchPackages.pending, (state) => ({
      loading: true,
      flightpackage: {
        message: '',
      },
    }));
    builder.addCase(fetchPackages.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      flightpackage: action.payload,
      error: '',
    }));
    builder.addCase(fetchPackages.rejected, (state, action) => {
      // eslint-disable-next-line
      state.loading = false;
      // eslint-disable-next-line
      state.flightpackage = [];
      // eslint-disable-next-line
      state.error = action.error.message;
    });
    builder
    .addCase(addPackage.fulfilled, (state, action) => {
      if (action.payload.error) {
        return {
          ...state,
          loading: false,
          sucess: false,
          error: action.payload.error,
        };
      }

      return {
        ...state,
        sucess: true,
        loading: false,
        message: action.payload.message,
      };
    })
    .addCase(addPackage.pending, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(addPackage.rejected, (state, action) => ({
      ...state,
      sucess: false,
      message: action.payload.message,
    }));
  },
});

export default packageSlice.reducer;
