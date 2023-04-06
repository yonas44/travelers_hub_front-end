import { configureStore } from '@reduxjs/toolkit';
import packageSlice from './packageSlice';

const store = configureStore({
  reducer: {
    flightpackage: packageSlice,
  },
});

export default store;
