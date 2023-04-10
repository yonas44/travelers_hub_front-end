import { createAsyncThunk } from '@reduxjs/toolkit';

export const postReservations = createAsyncThunk(
    'reservations',
    async (object) => {
      await fetch('http://127.0.0.1:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(object),
      });
    },
  );

export default postReservations;