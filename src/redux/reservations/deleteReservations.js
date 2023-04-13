import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const RESERVATION_URL = `${process.env.REACT_APP_API_ROOT_URL}/booking`;

const deleteReservation = createAsyncThunk('deleteReservation', async (id) => {
  const response = await fetch(RESERVATION_URL, {
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
