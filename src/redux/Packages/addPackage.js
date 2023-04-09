import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const addPackage = createAsyncThunk('addPackage', async (info) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({ package: info }),
    });

    const data = await response.json();
    if (data.message) {
      return { sucess: true, message: data.message };
    }

    return { sucess: false, error: data.error };
  } catch (error) {
    return { sucess: false, error };
  }
});

export default addPackage;