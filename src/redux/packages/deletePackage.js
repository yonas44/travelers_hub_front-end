import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const deletePackage = createAsyncThunk('deletePackage', async (id) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/package', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (data.message) {
      return { sucess: true, message: data.message };
    }

    return { sucess: false, error: data.error };
  } catch (error) {
    return { sucess: false, error: 'There was a network error' };
  }
});

export default deletePackage;
