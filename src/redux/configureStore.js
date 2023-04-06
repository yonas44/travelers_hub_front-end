import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './reservations/reservationSlice';

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
  },
});

export default store;
