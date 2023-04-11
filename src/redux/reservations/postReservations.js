import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

export const postReservations = createAsyncThunk(
    'reservations',
    async (object) => {
      await fetch('http://127.0.0.1:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
        body: JSON.stringify({booking: object}),
      });
    },
  );

export default postReservations;