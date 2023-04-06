import { createAsyncThunk } from '@reduxjs/toolkit';

const getReservations = createAsyncThunk('reservations', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8080/bookings', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    if (data.message) {
      return { sucess: false, message: data.message };
    }

    return { sucess: true, data };
  } catch (err) {
    return { sucess: false, err };
  }
});

export default getReservations;
