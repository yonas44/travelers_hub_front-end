import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const RESERVATION_URL = `${process.env.REACT_APP_API_ROOT_URL}/bookings`;

const getReservations = createAsyncThunk('getReservations', async () => {
  try {
    const response = await fetch(RESERVATION_URL, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: getToken(),
      },
      cache: 'no-store',
    });

    const data = await response.json();
    if (data.message) {
      return { success: true, message: data.message };
    }

    if (data.errors) {
      return { sucess: false, err: 'Session has expired!' };
    }
    return { sucess: true, data };
  } catch (err) {
    return { success: false, err };
  }
});

export default getReservations;
