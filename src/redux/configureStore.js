import { configureStore } from '@reduxjs/toolkit';
import packageSlice from './packageSlice';
import authReducer from './auth/auth';
// import flashReducer from './flash/flash';
import reservationsReducer from './reservations/reservationSlice';

const store = configureStore({
  reducer: {
    flightpackage: packageSlice,
    auth: authReducer,
    // flash: flashReducer,
    reservations: reservationsReducer,
  },
});

export default store;
