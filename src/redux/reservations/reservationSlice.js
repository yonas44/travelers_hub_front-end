import { createSlice } from '@reduxjs/toolkit';
import deleteReservation from './deleteReservations';
import getReservations from './getReservations';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    pending: false,
    filterby: '',
    change: false,
    message: '',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.fulfilled, (state, action) => {
        if (action.payload.sucess) {
          return { ...state, pending: false, data: action.payload.data };
        }
        return {
          ...state,
          pending: false,
          message: action.payload.message,
          data: [],
        };
      })
      .addCase(getReservations.rejected, (state, action) => ({
        ...state,
        pending: false,
        err: action.payload.message,
      }))
      .addCase(getReservations.pending, (state) => ({
        ...state,
        pending: true,
      }))
      .addCase(deleteReservation.fulfilled, (state, action) => {
        if (action.payload.sucess) {
          return {
            ...state,
            pending: false,
            message: action.payload.message,
            change: !state.change,
          };
        }
        return { ...state, pending: false, message: action.payload.error };
      });
  },
});

export default reservationSlice.reducer;
export const { filterReservations, selectedReservations } = reservationSlice.actions;
