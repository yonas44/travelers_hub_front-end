import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const deleteReservation = createAsyncThunk('deleteReservation', async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/bookings/${id}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: getToken(),
      },
    });

    const data = await response.json();
    if (response.ok) {
      return { sucess: true, message: data.message };
    }
    return { sucess: false, err: data.message };
  } catch (err) {
    return { sucess: false, err };
  }
});

export default deleteReservation;
