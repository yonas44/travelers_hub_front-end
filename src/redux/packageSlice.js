import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import addPackage from './packages/addPackage';
import deletePackage from './packages/deletePackage';

const initialState = {
  loading: false,
  flightpackage: [],
  error: '',
};

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => fetch('http://127.0.0.1:3000/packages').then((response) => response.json()),
);

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  extraReducers: (builder) => {
    // eslint-disable-next-line
    builder.addCase(fetchPackages.pending, (state) => ({
      loading: true,
      flightpackage: [],
    }));
    builder.addCase(fetchPackages.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      flightpackage: action.payload,
      error: '',
      message: '',
    }));
    builder
      .addCase(fetchPackages.rejected, (state, action) => {
        // eslint-disable-next-line
        state.loading = false;
        // eslint-disable-next-line
        state.flightpackage = [];
        // eslint-disable-next-line
        state.error = action.error.message;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        if (action.payload.error) {
          return {
            ...state,
            loading: false,
            sucess: false,
            message: '',
            err: action.payload.error,
          };
        }

        return {
          ...state,
          sucess: true,
          loading: false,
          err: '',
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
      }))
      .addCase(deletePackage.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deletePackage.fulfilled, (state, action) => {
        if (action.payload.error) {
          return {
            ...state,
            loading: false,
            sucess: false,
            message: '',
            change: !state.change,
            error: action.payload.error,
          };
        }

        return {
          ...state,
          sucess: true,
          loading: false,
          change: !state.change,
          error: '',
          message: action.payload.message,
        };
      })
      .addCase(deletePackage.rejected, (state, action) => ({
        ...state,
        sucess: false,
        error: action.payload.message,
      }));
  },
});

export default packageSlice.reducer;
