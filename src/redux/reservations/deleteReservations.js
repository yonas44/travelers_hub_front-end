import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const deleteReservation = createAsyncThunk('deleteReservation', async (id) => {
  const RESERVATION_URL = `${process.env.REACT_APP_API_ROOT_URL}/bookings/${id}`;

  try {
    const response = await fetch(RESERVATION_URL, {
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
