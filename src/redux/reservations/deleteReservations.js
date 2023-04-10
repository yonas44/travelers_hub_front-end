import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const deleteReservation = createAsyncThunk('deleteReservation', async (id) => {
  const response = await fetch('http://127.0.0.1:3000/booking', {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();
  if (response.ok) {
    return { sucess: true, message: data.message };
  }
  return { sucess: false, error: data.error };
});

export default deleteReservation;
