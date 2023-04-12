import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  flightpackage: [],
  error: '',
};

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => fetch('http://127.0.0.1:3000/packages')
    .then((response) => response.json()),
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
  },
});

export default packageSlice.reducer;
