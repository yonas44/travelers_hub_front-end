import { createSlice } from '@reduxjs/toolkit';
import getReservations from './getReservations';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    pending: false,
    filterby: '',
    message: 'Sorry, nothing to display',
    selected: 'All',
    toBeEdited: null,
    data: [],
  },
  reducers: {
    filterReservations: (state, action) => ({
      ...state,
      filterby: action.payload,
    }),
    selectedReservations: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    toBeEditedReservation: (state, action) => ({
      ...state,
      toBeEdited: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.fulfilled, (state, action) => {
        if (action.payload.sucess) {
          return { ...state, pending: false, data: action.payload.data };
        }
        return { ...state, pending: false, message: action.payload.message };
      })
      .addCase(getReservations.rejected, (state, action) => ({
        ...state,
        pending: false,
        err: action.payload.message,
      }))
      .addCase(getReservations.pending, (state) => ({
        ...state,
        pending: true,
      }));
  },
});

export default reservationSlice.reducer;
export const {
  filterReservations,
  selectedReservations,
  toBeEditedReservation,
} = reservationSlice.actions;
