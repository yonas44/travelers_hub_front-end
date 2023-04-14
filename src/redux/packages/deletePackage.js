import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/auth';

const deletePackage = createAsyncThunk('deletePackage', async (id) => {
  const PACKAGE_URL = `${process.env.REACT_APP_API_ROOT_URL}/packages/${id}`;

  try {
    const response = await fetch(PACKAGE_URL, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
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
