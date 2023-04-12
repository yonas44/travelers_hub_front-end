import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const postReservations = createAsyncThunk(
  'postReservations',
  async (object) => {
    const response = await fetch('http://127.0.0.1:3000/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({ booking: object }),
    });

    const data = await response.json();
    if (data.message) {
      return { sucess: true, message: data.message };
    }

    return { sucess: false, err: "Booking wasn't saved successfully." };
  },
);

export default postReservations;
