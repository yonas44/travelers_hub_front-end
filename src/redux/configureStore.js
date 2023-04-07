import { configureStore } from '@reduxjs/toolkit';
import packageSlice from './packageSlice';

import authReducer from './auth/auth';
// import flashReducer from './flash/flash';

const store = configureStore({
  reducer: {
    flightpackage: packageSlice,
    auth: authReducer,
    // flash: flashReducer,
  },
});

export default store;
