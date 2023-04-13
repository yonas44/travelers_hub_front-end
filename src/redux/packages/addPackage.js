import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const PACKAGE_URL = `${process.env.REACT_APP_API_ROOT_URL}/packages`;

const addPackage = createAsyncThunk('addPackage', async (info) => {
  try {
    const response = await fetch(PACKAGE_URL, {
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
